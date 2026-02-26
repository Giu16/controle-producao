(() => {
  'use strict';

  let products = [];
  let materials = [];
  let associations = [];

  const findProduct = code => products.find(p => p.code === code);
  const findMaterial = code => materials.find(m => m.code === code);
  const findAssociationIndex = (productCode, materialCode) =>
    associations.findIndex(a => a.productCode === productCode && a.materialCode === materialCode);

  const productForm = document.getElementById('product-form');
  const productCodeInput = document.getElementById('product-code');
  const productNameInput = document.getElementById('product-name');
  const productValueInput = document.getElementById('product-value');
  const productsTableBody = document.querySelector('#products-table tbody');

  const materialForm = document.getElementById('material-form');
  const materialCodeInput = document.getElementById('material-code');
  const materialNameInput = document.getElementById('material-name');
  const materialStockInput = document.getElementById('material-stock');
  const materialsTableBody = document.querySelector('#materials-table tbody');

  const assocForm = document.getElementById('association-form');
  const assocProductSelect = document.getElementById('assoc-product-select');
  const assocMaterialSelect = document.getElementById('assoc-material-select');
  const assocQuantityInput = document.getElementById('assoc-quantity');
  const associationsTableBody = document.querySelector('#associations-table tbody');

  const calculateBtn = document.getElementById('calculate-production-btn');
  const productionResultDiv = document.getElementById('production-result');

  const renderProducts = () => {
    productsTableBody.innerHTML = '';
    assocProductSelect.innerHTML = '<option value="" disabled selected>-- Select Product --</option>';

    products.forEach(({ code, name, value }) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${code}</td>
        <td>${name}</td>
        <td>${value.toFixed(2)}</td>
        <td class="actions">
          <button data-code="${code}" class="edit-product" aria-label="Edit Product ${code}">Edit</button>
          <button data-code="${code}" class="delete-product" aria-label="Delete Product ${code}">Delete</button>
        </td>
      `;

      productsTableBody.appendChild(tr);

      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${code} - ${name}`;
      assocProductSelect.appendChild(option);
    });
  };

  const renderMaterials = () => {
    materialsTableBody.innerHTML = '';
    assocMaterialSelect.innerHTML = '<option value="" disabled selected>-- Select Material --</option>';

    materials.forEach(({ code, name, stock }) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${code}</td>
        <td>${name}</td>
        <td>${stock}</td>
        <td class="actions">
          <button data-code="${code}" class="edit-material" aria-label="Edit Material ${code}">Edit</button>
          <button data-code="${code}" class="delete-material" aria-label="Delete Material ${code}">Delete</button>
        </td>
      `;

      materialsTableBody.appendChild(tr);

      const option = document.createElement('option');
      option.value = code;
      option.textContent = `${code} - ${name}`;
      assocMaterialSelect.appendChild(option);
    });
  };

  const renderAssociations = () => {
    associationsTableBody.innerHTML = '';

    associations.forEach(({ productCode, materialCode, quantityNeeded }) => {
      const product = findProduct(productCode);
      const material = findMaterial(materialCode);
      if (!product || !material) return; // safety check

      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${product.code}</td>
        <td>${product.name}</td>
        <td>${material.code}</td>
        <td>${material.name}</td>
        <td>${quantityNeeded}</td>
        <td class="actions">
          <button data-product="${product.code}" data-material="${material.code}" class="edit-association" aria-label="Edit Association">Edit</button>
          <button data-product="${product.code}" data-material="${material.code}" class="delete-association" aria-label="Delete Association">Delete</button>
        </td>
      `;

      associationsTableBody.appendChild(tr);
    });
  };


  productForm.addEventListener('submit', e => {
    e.preventDefault();

    const code = productCodeInput.value.trim();
    const name = productNameInput.value.trim();
    const value = parseFloat(productValueInput.value);

    if (!code || !name || isNaN(value) || value < 0) {
      alert('Please fill out all product fields correctly.');
      return;
    }

    const existingIndex = products.findIndex(p => p.code === code);

    if (existingIndex >= 0) {
      products[existingIndex] = { code, name, value };
    } else {
      products.push({ code, name, value });
    }

    productForm.reset();
    renderProducts();
    renderAssociations(); 

  });

  materialForm.addEventListener('submit', e => {
    e.preventDefault();

    const code = materialCodeInput.value.trim();
    const name = materialNameInput.value.trim();
    const stock = parseInt(materialStockInput.value);

    if (!code || !name || isNaN(stock) || stock < 0) {
      alert('Please fill out all material fields correctly.');
      return;
    }

    const existingIndex = materials.findIndex(m => m.code === code);

    if (existingIndex >= 0) {
      materials[existingIndex] = { code, name, stock };
    } else {
      materials.push({ code, name, stock });
    }

    materialForm.reset();
    renderMaterials();
    renderAssociations(); 
  });

  assocForm.addEventListener('submit', e => {
    e.preventDefault();

    const productCode = assocProductSelect.value;
    const materialCode = assocMaterialSelect.value;
    const quantityNeeded = parseInt(assocQuantityInput.value);

    if (!productCode || !materialCode || isNaN(quantityNeeded) || quantityNeeded <= 0) {
      alert('Please fill out all association fields correctly.');
      return;
    }

    const index = findAssociationIndex(productCode, materialCode);

    if (index >= 0) {
      associations[index].quantityNeeded = quantityNeeded;
    } else {
      associations.push({ productCode, materialCode, quantityNeeded });
    }

    assocForm.reset();
    renderAssociations();
  });

  productsTableBody.addEventListener('click', e => {
    if (e.target.classList.contains('edit-product')) {
      const code = e.target.dataset.code;
      const product = findProduct(code);
      if (!product) return;

      productCodeInput.value = product.code;
      productNameInput.value = product.name;
      productValueInput.value = product.value.toFixed(2);
    } else if (e.target.classList.contains('delete-product')) {
      const code = e.target.dataset.code;

      products = products.filter(p => p.code !== code);
      associations = associations.filter(a => a.productCode !== code);

      renderProducts();
      renderAssociations();
    }
  });

    materialsTableBody.addEventListener('click', e => {
    if (e.target.classList.contains('edit-material')) {
      const code = e.target.dataset.code;
      const material = findMaterial(code);
      if (!material) return;

      materialCodeInput.value = material.code;
      materialNameInput.value = material.name;
      materialStockInput.value = material.stock;
    } else if (e.target.classList.contains('delete-material')) {
      const code = e.target.dataset.code;

      materials = materials.filter(m => m.code !== code);
      associations = associations.filter(a => a.materialCode !== code);

      renderMaterials();
      renderAssociations();
    }
  });

  associationsTableBody.addEventListener('click', e => {
    if (e.target.classList.contains('edit-association')) {
      const productCode = e.target.dataset.product;
      const materialCode = e.target.dataset.material;

      const assoc = associations.find(a => a.productCode === productCode && a.materialCode === materialCode);
      if (!assoc) return;

      assocProductSelect.value = assoc.productCode;
      assocMaterialSelect.value = assoc.materialCode;
      assocQuantityInput.value = assoc.quantityNeeded;
    } else if (e.target.classList.contains('delete-association')) {
      const productCode = e.target.dataset.product;
      const materialCode = e.target.dataset.material;

      associations = associations.filter(a => !(a.productCode === productCode && a.materialCode === materialCode));
      renderAssociations();
    }
  });

  calculateBtn.addEventListener('click', () => {
    if (products.length === 0) {
      alert('No products registered.');
      return;
    }
    if (materials.length === 0) {
      alert('No materials registered.');
      return;
    }

    const productsByValue = [...products].sort((a, b) => b.value - a.value);

    const productionPlan = [];

    const stockMap = new Map(materials.map(m => [m.code, m.stock]));

    for (const product of productsByValue) {
      const neededMaterials = associations.filter(a => a.productCode === product.code);

      if (neededMaterials.length === 0) {
        continue;
      }

      let maxQty = Infinity;

      for (const assoc of neededMaterials) {
        const availableStock = stockMap.get(assoc.materialCode) ?? 0;
        const possibleQty = Math.floor(availableStock / assoc.quantityNeeded);
        if (possibleQty < maxQty) maxQty = possibleQty;
      }

      if (maxQty === 0 || maxQty === Infinity) {
        continue;
      }

      for (const assoc of neededMaterials) {
        const currentStock = stockMap.get(assoc.materialCode);
        stockMap.set(assoc.materialCode, currentStock - maxQty * assoc.quantityNeeded);
      }

      productionPlan.push({
        productCode: product.code,
        productName: product.name,
        maxQuantity: maxQty,
        productValue: product.value
      });
    }

    if (productionPlan.length === 0) {
      productionResultDiv.style.display = 'block';
      productionResultDiv.textContent = 'No products can be produced with current stock.';
      return;
    }

    const totalValue = productionPlan.reduce((sum, p) => sum + p.maxQuantity * p.productValue, 0);

    let output = 'Production Suggestion:\n\n';
    output += productionPlan.map(p => 
      `${p.productName} (Code: ${p.productCode}): ${p.maxQuantity} unit(s) x $${p.productValue.toFixed(2)}`
    ).join('\n');
    output += `\n\nTotal Production Value: $${totalValue.toFixed(2)}`;

    productionResultDiv.style.display = 'block';
    productionResultDiv.textContent = output;
  });

  renderProducts();
  renderMaterials();
  renderAssociations();

})();
