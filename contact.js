
// Nhận sự kiện thanh tìm kiếm
const frmSearch = document.getElementById('header-formSearch');
const inputSearch = document.getElementById('searchInput');
const iconSearch = document.getElementById('iconSearch');

function checkEnterKey(event) {
    let key = event.which;
    if (key === 13) {
        searchForward(event);
    }
}
function searchForward(e) {
    if (inputSearch.value.length === 0) {
        e.preventDefault();
    } else {
        frmSearch.action = 'tintuc.html' + location.search;     // chuyển đến địa chỉ kèm theo query string
        frmSearch.submit();
    }
}

inputSearch.addEventListener('keydown', checkEnterKey);
iconSearch.addEventListener('click', searchForward);



//  Khi click vào button "ClickNgay" thì sẽ cuộn trang tới id='contact'
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

fields.forEach(field => {
    const elmt = document.getElementById(field.id);         // lấy input theo id
    elmt.addEventListener('blur', () => {              // kiểm tra sự kiện khi rời khỏi ô nhập liệu
        if (elmt.value === '') {            // nếu rỗng thì xóa class 'success', 'error' và ẩn thông báo
            showMessage(elmt, '', '');
            return;             // thoát hàm khi rỗng
        }

        let errorMsg = "";
        if (field.id === 'iName' && !isValidName(elmt.value)) {
            errorMsg = "Tên phải có ít nhất 3 kí tự!";
        } else if (field.id === 'iEmail' && (!isValidEmail(elmt.value))) {
            errorMsg = "Email không hợp lệ!";
        } else if (field.id === 'iQuestion' && (!isValidQuestion(elmt.value))) {
            errorMsg = "Câu hỏi phải ít nhất có 15 kí tự!"
        }
        
        // Gọi showMessage() với điều kiện: nếu isValid true thì type = 'success' và ẩn thông báo (ngược lại type = 'error' và hiện erroMsg)
        const isValid = field.validator(elmt.value);
        showMessage(elmt, isValid ? 'success' : 'error', isValid ? '' : errorMsg);
    });
});
