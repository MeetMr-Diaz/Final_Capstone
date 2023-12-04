// Function to toggle between student and admin forms
function toggleLoginForm(formToShow, formToHide, activeButton, inactiveButton) {
    formToShow.style.display = 'block';
    formToHide.style.display = 'none';

    // Add the active class to the clicked button and remove it from the other button
    activeButton.classList.add('active-button');
    inactiveButton.classList.remove('active-button');
}

const studentLink = document.getElementById('student-login-link');
const adminLink = document.getElementById('admin-login-link');
const studentForm = document.getElementById('student-login-form');
const adminForm = document.getElementById('admin-login-form');

// Event listener for student login link
studentLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleLoginForm(studentForm, adminForm, studentLoginBtn, adminLoginBtn);
});

// Event listener for admin login link
adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    toggleLoginForm(adminForm, studentForm, adminLoginBtn, studentLoginBtn);
});

// Event listener for the "Student Login" button
const studentLoginBtn = document.getElementById('student-login-link-admin');
studentLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleLoginForm(studentForm, adminForm, studentLoginBtn, adminLoginBtn);
});

// Event listener for the "Admin Login" button
const adminLoginBtn = document.getElementById('admin-login-link-admin');
adminLoginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleLoginForm(adminForm, studentForm, adminLoginBtn, studentLoginBtn);
});
