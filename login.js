// Chờ cho toàn bộ nội dung HTML được tải xong
document.addEventListener('DOMContentLoaded', function() {
	// Lấy ra phần tử form đăng nhập bằng tag name
	const loginForm = document.querySelector('form');
	
	// Lấy ra các trường input
	const usernameInput = document.getElementById('username');
	const passwordInput = document.getElementById('password');
	
	// Lắng nghe sự kiện khi form được gửi (nhấn nút "Đăng nhập")
	loginForm.addEventListener('submit', function(event) {
		// Ngăn chặn hành vi gửi form mặc định của trình duyệt
		// Nếu không có dòng này, trang sẽ reload khi nhấn submit
		event.preventDefault();
		
		// Lấy giá trị từ các trường input
		const username = usernameInput.value.trim(); // .trim() để loại bỏ khoảng trắng thừa
		const password = passwordInput.value.trim();
		
		// --- Kiểm tra (Validation) ---
		let isValid = true; // Biến cờ để theo dõi trạng thái hợp lệ
		
		// Kiểm tra trường tên đăng nhập/email
		if (username === '') {
			alert('Vui lòng nhập tên đăng nhập hoặc email của bạn.');
			usernameInput.focus(); // Tập trung vào trường này
			isValid = false;
		}
		// Bạn có thể thêm kiểm tra định dạng email ở đây nếu muốn
		// else if (!username.includes('@')) {
		//     alert('Email không đúng định dạng.');
		//     isValid = false;
		// }
		
		// Kiểm tra trường mật khẩu
		if (password === '') {
			alert('Vui lòng nhập mật khẩu của bạn.');
			passwordInput.focus();
			isValid = false;
		}
		// Bạn có thể thêm kiểm tra độ dài mật khẩu ở đây
		// else if (password.length < 6) {
		//     alert('Mật khẩu phải có ít nhất 6 ký tự.');
		//     isValid = false;
		// }
		
		// Nếu tất cả các trường đều hợp lệ
		if (isValid) {
			// Ở đây, trong một ứng dụng thực tế, bạn sẽ gửi dữ liệu này đến Backend (server)
			// bằng cách sử dụng Fetch API hoặc XMLHttpRequest.
			// Ví dụ:
			// fetch('/api/login', {
			//     method: 'POST',
			//     headers: {
			//         'Content-Type': 'application/json',
			//     },
			//     body: JSON.stringify({ username: username, password: password }),
			// })
			// .then(response => response.json())
			// .then(data => {
			//     if (data.success) {
			//         alert('Đăng nhập thành công!');
			//         // Chuyển hướng người dùng đến trang chính
			//         window.location.href = '/dashboard.html'; // Thay đổi thành trang chính của bạn
			//     } else {
			//         alert('Đăng nhập thất bại: ' + data.message);
			//     }
			// })
			// .catch(error => {
			//     console.error('Lỗi khi gửi yêu cầu đăng nhập:', error);
			//     alert('Đã có lỗi xảy ra. Vui lòng thử lại.');
			// });
			
			if (isValid) {
				// Mô phỏng đăng nhập thành công và chuyển hướng
				alert('Đăng nhập thành công (mô phỏng)! Chuyển hướng đến trang quản lý lớp học.');
				window.location.href = 'classes.html'; // Thay 'classes.html' bằng tên trang quản lý lớp học của bạn
			}
			
		}
	});
});
