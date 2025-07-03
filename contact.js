
// function toggleMenu() {
//     document.getElementById("mobileMenu").classList.toggle("active");
// }

// function frmValidate(frm) { /* hàm xác thực dữ liệu trước khi submit */
//     if (frm.checkValidity()) {
//         alert("Submitted");
//         return true;
//     }else {
//         alert("Error");
//         return false
//     }
// }

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


//  Khi click vào button Click Ngay thì sẽ cuộn trang tới id='contact'
document.getElementById('btn-ClickNgay').addEventListener('click', function() {
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
});
