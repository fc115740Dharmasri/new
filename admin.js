 document.addEventListener('DOMContentLoaded', function () {
        const logoutBtn = document.querySelector('.logout-btn');

        logoutBtn.addEventListener('click', function () {
            const confirmLogout = confirm("Are you sure you want to log out?");
            if (confirmLogout) {
                
                window.location.href = 'login.html'; 
            } else {
                
            }
        });
    });