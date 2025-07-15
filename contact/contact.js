// File: contact.js
// Tác giả: Thái Duy Khang, B2308301, khangb2308301@student.ctu.edu.vn
// Mã nguồn tham khảo: https://www.w3schools.com/js/,...


// Phần header
// CLick ngoài toggle thì đóng
document.addEventListener('click', function (event) {
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('main-menu');

    const isClickInsideMenu = menu.contains(event.target);
    const isClickToggle = toggle.contains(event.target);

    if (!isClickInsideMenu && !isClickToggle) {
        menu.classList.remove('show'); // ẩn menu nếu click bên ngoài
    }
});

// Toggle menu khi mobile
function toggleMenu() {
    document.getElementById('main-menu').classList.toggle('show');
}

// Đổi nền page đang đứng
document.addEventListener('DOMContentLoaded', () => {
    const currentUrl = window.location.pathname;
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentUrl) {
            link.classList.add('active');
        }
    });
});



// Khi click vào button "ClickNgay" thì sẽ cuộn trang tới id='contact'
document.getElementById('btn-ClickNgay').addEventListener('click', function() {
    document.getElementById('contactForm').scrollIntoView();
});

// Khi click vào button "HoiNgay" thì sẽ cuộn trang tới id='faq'
document.getElementById('btn-HoiNgay').addEventListener('click', function() {
    document.getElementById('faq').scrollIntoView();
});



// Kích hoạt phần trả lời của FAQs bị ẩn (khi có sự kiện click (faq-section))
const onButtonClick = (event) => {
    const faq_item = event.currentTarget.parentElement;         // lấy phần tử gắn sự kiện click hiện tại
    faq_item.classList.toggle('active');            // hiển thị nội dung
}

const faqs_expand = document.querySelectorAll('.faq-question');
faqs_expand.forEach(button => button.addEventListener('click', onButtonClick));



//  Kiểm tra tính hợp lệ của biểu mẫu và xác thực dữ liệu
function showMessage(elmt, type, message="") {
    const formRow = elmt.closest('.contact-form__form-row');           // tìm phần tử cha gần nhất có chứa class 'form-row'
    const messageBox = formRow.querySelector('.message');

    formRow.classList.remove('error', 'success');      // xóa bỏ trạng thái cũ
    if (type) {
        formRow.classList.add(type);            // thêm trạng thái mới: 'error' hoặc 'success'
    }

    if (messageBox) {           // kiểm tra messageBox có tồn tại hay không
        messageBox.textContent = message;           // hiển thị nội dung thông báo
        messageBox.style.visibility = message ? 'visible' : 'hidden';            // nếu có nội dung thì hiện, không thì ẩn
    }
}

const checkMinLength = (value, min) => value.trim().length >= min;
const isValidName = value => checkMinLength(value, 3);
const isValidQuestion = value => checkMinLength(value, 15);
const isValidEmail = value => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim());           // hàm kiểm tra tính hợp lệ của email

const fields = [
    {id: 'iName', validator: isValidName},
    {id: 'iEmail', validator: isValidEmail},
    {id: 'iQuestion', validator: isValidQuestion}
];

// Kiểm tra 1 trường
function validateField(elmt, field) {
    const value = elmt.value.trim();
    
    // nếu rỗng thì xóa class 'success', 'error' và ẩn thông báo
    if (elmt.value === '') {
        showMessage(elmt, '', '');
        return;           // thoát hàm khi rỗng
    }

    let errorMsg = "";
    if (field.id === 'iName' && !isValidName(value)) {
        errorMsg = "Tên phải có ít nhất 3 kí tự!";
    } else if (field.id === 'iEmail' && !isValidEmail(value)) {
        errorMsg = "Email không hợp lệ!";
    } else if (field.id === 'iQuestion' && !isValidQuestion(value)) {
        errorMsg = "Câu hỏi phải ít nhất có 15 kí tự!";
    }

    // Gọi showMessage() với điều kiện: nếu isValid true thì type = 'success' và ẩn thông báo (ngược lại type = 'error' và hiện erroMsg)
    const isValid = field.validator(value);
    showMessage(elmt, isValid ? 'success' : 'error', isValid ? '' : errorMsg);
    return isValid;
}

// Kiểm tra tất cả các trường
function validateAllFields() {
    let isFormValid = true;

    fields.forEach(field => {
        const elmt = document.getElementById(field.id);     // lấy input theo id
        const isValid = validateField(elmt, field);
        if (!isValid) isFormValid = false;
    });

    return isFormValid;
}

// Bắt sự kiện blur cho từng ô
fields.forEach(field => {
    const elmt = document.getElementById(field.id);
    elmt.addEventListener('blur', () => validateField(elmt, field));        // kiểm tra sự kiện khi rời khỏi ô nhập liệu
});

// Xử lý khi gửi form
document.getElementById('contact-form__submitForm').addEventListener('click', function(event) {
    event.preventDefault();         // Chặn gửi form mặc định

    const isValid = validateAllFields();

    if (isValid) {
        alert("Gửi thành công!");
    }
});
