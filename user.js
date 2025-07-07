let currentUser = {
            name: "Mr.Sanjaya Fernando",
            email: "sanjaya@gmail.com",
            id: "LEC-2024-062",
            status: "Lecturer",
            faculty: "Computing",
            department: "Computer Science",
            year: "Assistant Professor",
            phone: "077-9312234",
            photo: null
        };

        // Initialize the profile view
        function initializeProfile() {
            updateProfileView();
        }

        // Update profile view with current user data
        function updateProfileView() {
            document.getElementById('profileName').textContent = currentUser.name;
            document.getElementById('profileEmail').textContent = currentUser.email;
            document.getElementById('profileId').textContent = currentUser.id;
            document.getElementById('profileStatus').textContent = currentUser.status;
            document.getElementById('profileFaculty').textContent = currentUser.faculty;
            document.getElementById('profileDepartment').textContent = currentUser.department;
            document.getElementById('profileYear').textContent = currentUser.year;
            document.getElementById('profilePhone').textContent = currentUser.phone;
            
            // Handle profile photo
            const profilePhoto = document.getElementById('profilePhoto');
            const defaultPhoto = document.getElementById('defaultPhoto');
            
            if (currentUser.photo) {
                profilePhoto.src = currentUser.photo;
                profilePhoto.style.display = 'block';
                defaultPhoto.style.display = 'none';
            } else {
                profilePhoto.style.display = 'none';
                defaultPhoto.style.display = 'flex';
            }
        }

        // Show edit profile view
        function showEditProfile() {
            document.getElementById('profileView').classList.add('hidden');
            document.getElementById('editProfileView').classList.remove('hidden');
            populateEditForm();
        }

        // Populate edit form with current user data
        function populateEditForm() {
            document.getElementById('editName').value = currentUser.name;
            document.getElementById('editEmail').value = currentUser.email;
            document.getElementById('editId').value = currentUser.id;
            document.getElementById('editStatus').value = currentUser.status;
            document.getElementById('editFaculty').value = currentUser.faculty;
            document.getElementById('editDepartment').value = currentUser.department;
            document.getElementById('editYear').value = currentUser.year;
            document.getElementById('editPhone').value = currentUser.phone;
            
            // Handle current photo in edit form
            const currentPhoto = document.getElementById('currentPhoto');
            const currentDefaultPhoto = document.getElementById('currentDefaultPhoto');
            
            if (currentUser.photo) {
                currentPhoto.src = currentUser.photo;
                currentPhoto.style.display = 'block';
                currentDefaultPhoto.style.display = 'none';
            } else {
                currentPhoto.style.display = 'none';
                currentDefaultPhoto.style.display = 'flex';
            }
        }

        // Cancel edit and return to profile view
        function cancelEdit() {
            document.getElementById('editProfileView').classList.add('hidden');
            document.getElementById('profileView').classList.remove('hidden');
        }

        // Handle photo upload
        document.getElementById('photoInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const currentPhoto = document.getElementById('currentPhoto');
                    const currentDefaultPhoto = document.getElementById('currentDefaultPhoto');
                    
                    currentPhoto.src = e.target.result;
                    currentPhoto.style.display = 'block';
                    currentDefaultPhoto.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle form submission
        document.getElementById('editProfileForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('editName').value,
                email: document.getElementById('editEmail').value,
                id: document.getElementById('editId').value,
                status: document.getElementById('editStatus').value,
                faculty: document.getElementById('editFaculty').value,
                department: document.getElementById('editDepartment').value,
                year: document.getElementById('editYear').value,
                phone: document.getElementById('editPhone').value,
                photo: document.getElementById('currentPhoto').style.display === 'block' ? document.getElementById('currentPhoto').src : null
            };
            
            // Update current user data
            currentUser = { ...currentUser, ...formData };
            
            // Update profile view
            updateProfileView();
            
            // Show success message (you can customize this)
            alert('Profile updated successfully!');
            
            // Return to profile view
            cancelEdit();
            
            // Here you would typically send the data to your backend
            console.log('Profile data to be sent to backend:', formData);
        });

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            initializeProfile();
        });

        // Backend integration functions (ready for implementation)
        async function saveUserProfile(userData) {
            try {
                // Example API call structure
                const response = await fetch('/api/users/profile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify(userData)
                });
                
                if (!response.ok) {
                    throw new Error('Failed to update profile');
                }
                
                const result = await response.json();
                return result;
            } catch (error) {
                console.error('Error updating profile:', error);
                throw error;
            }
        }

        async function loadUserProfile() {
            try {
                // Example API call structure
                const response = await fetch('/api/users/profile', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to load profile');
                }
                
                const userData = await response.json();
                currentUser = userData;
                updateProfileView();
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        }