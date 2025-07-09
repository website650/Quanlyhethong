document.addEventListener('DOMContentLoaded', function() {
	const classTitleElement = document.getElementById('class-title');
	const studentListBody = document.getElementById('student-list-body');
	const attendanceLink = document.getElementById('attendance-link'); // <-- Dòng này để lấy nút điểm danh
	
	// Lấy classId từ URL (ví dụ: class_detail.html?classId=L001)
	const urlParams = new URLSearchParams(window.location.search);
	const classId = urlParams.get('classId');
	
	// Dữ liệu sinh viên mẫu (thực tế sẽ lấy từ API/backend)
	const mockStudents = {
		'L001': [
			{ id: 'SV001', name: 'Phạm Duy Anh', dob: '01/01/2002', gender: 'Nam' },
			{ id: 'SV002', name: 'Nguyễn Thị Bình', dob: '15/03/2002', gender: 'Nữ' },
			{ id: 'SV003', name: 'Trần Văn Chung', dob: '20/07/2002', gender: 'Nam' },
			{ id: 'SV004', name: 'Hoàng Kim Dung', dob: '10/05/2002', gender: 'Nữ' }
		],
		'L002': [
			{ id: 'SV005', name: 'Lý Gia Hân', dob: '05/11/2001', gender: 'Nữ' },
			{ id: 'SV006', name: 'Vũ Minh Khôi', dob: '22/09/2000', gender: 'Nam' }
		],
		'L003': [
			{ id: 'SV007', name: 'Đặng Thanh Lam', dob: '18/02/2003', gender: 'Nữ' }
		]
	};
	
	if (classId && mockStudents[classId]) {
		// Cập nhật tiêu đề lớp
		const className = {
			'L001': 'Kỹ thuật Phần mềm K20',
			'L002': 'Khoa học Dữ liệu K21',
			'L003': 'Hệ thống Thông tin K19'
		} [classId] || classId;
		classTitleElement.textContent = `Danh sách Sinh viên Lớp ${className}`;
		
		// CẬP NHẬT ĐƯỜNG DẪN CHO NÚT ĐIỂM DANH LỚP NÀY
		// Đoạn này đảm bảo nút "Điểm Danh Lớp này" có đường dẫn đúng với classId
		if (attendanceLink) {
			attendanceLink.href = `attendance.html?classId=${classId}`;
		} else {
			console.warn("Element with ID 'attendance-link' not found. Attendance button might not work.");
		}
		
		// Hiển thị danh sách sinh viên
		let studentRowsHTML = '';
		mockStudents[classId].forEach(student => {
			studentRowsHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.dob}</td>
                    <td>${student.gender}</td>
                    <td>
                        <button class="btn btn-sm btn-warning">Sửa</button>
                        <button class="btn btn-sm btn-danger">Xóa</button>
                    </td>
                </tr>
            `;
		});
		studentListBody.innerHTML = studentRowsHTML;
		
	} else {
		classTitleElement.textContent = 'Lớp không tìm thấy hoặc chưa chọn.';
		studentListBody.innerHTML = '<tr><td colspan="5" style="text-align: center;">Không có dữ liệu sinh viên cho lớp này.</td></tr>';
		// Ẩn hoặc vô hiệu hóa nút điểm danh nếu không có lớp
		if (attendanceLink) {
			attendanceLink.style.display = 'none'; // Ẩn nút nếu không có classId
		}
	}
});
