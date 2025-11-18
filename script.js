// script.js
const GIS_URL = 'https://gist.githubusercontent.com/Datkep92/6149152b2e5b323ae6217e20c3f2dd53/raw/zalocash';

// Hàm tải dữ liệu từ GIS
async function loadProductsFromGIS() {
  try {
    console.log('🔄 Đang tải dữ liệu từ:', GIS_URL);
    
    // Thêm cache busting
    const response = await fetch(GIS_URL + '?t=' + new Date().getTime());
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      throw new Error('Không thể tải dữ liệu: ' + response.status);
    }
    
    const data = await response.json();
    console.log('✅ Dữ liệu nhận được:', data);
    
    return data.products || [];
    
  } catch (error) {
    console.error('❌ Lỗi tải dữ liệu:', error);
    return loadSampleData();
  }
}

// Dữ liệu mẫu (fallback)
function loadSampleData() {
  return [
    {
      name: "Cayvang",
      image: "https://ktkttayninh.edu.vn/wp-content/uploads/2024/07/app-vay-tien-cay-vang.jpg",
      discount: "0% lãi",
      amount: "1-10",
      unit: "Triệu",
      procedure: "CCCD",
      period: "3 tháng",
      age: "20 - 60",
      promotion: "Khuyến mãi",
      link: "https://www.zalocash.net"
    }
  ];
}

// Hàm tạo HTML cho một item
function createProductItem(product) {
  return `
    <a href="${product.link}" class="item" target="_blank">
      <div class="image-container">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        <div class="discount-label">${product.discount}</div>
      </div>
      <div class="info-row">
        <div class="amount">
          <span>Số Tiền:</span>
          <span>${product.amount}</span>
          <span>${product.unit}</span>
        </div>
        <div class="limit">
          <span>Thủ tục</span>
          <span>${product.procedure}</span>
          <span>tối đa</span>
          <span>${product.period}</span>
        </div>
      </div>
      <div class="period">Tuổi: ${product.age}</div>
      <div class="discount">${product.promotion}</div>
      <div class="button">CHI TIẾT</div>
    </a>
  `;
}

// Hàm render tất cả sản phẩm
function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  console.log('🎨 Rendering products:', products);
  
  if (products && products.length > 0) {
    grid.innerHTML = products.map(product => createProductItem(product)).join('');
    console.log(`✅ Đã render ${products.length} sản phẩm`);
  } else {
    grid.innerHTML = '<p class="no-data">Đang tải dữ liệu...</p>';
    console.log('⏳ Đang tải dữ liệu...');
  }
}

// Hàm làm mới dữ liệu
async function refreshData() {
  console.log('🔃 Bắt đầu refresh data...');
  const products = await loadProductsFromGIS();
  renderProducts(products);
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 Trang đã load - khởi tạo ứng dụng');
  refreshData();
  
  // Tự động làm mới mỗi 5 phút
  setInterval(refreshData, 5 * 60 * 1000);
});

// Hàm để làm mới thủ công
window.refreshProducts = refreshData;