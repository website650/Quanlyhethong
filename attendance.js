document.addEventListener('DOMContentLoaded', function() {
	const attendanceTitleElement = document.getElementById('attendance-title');
	const attendanceListBody = document.getElementById('attendance-list-body');
	const saveAttendanceBtn = document.getElementById('save-attendance-btn');
	
	// Lấy classId từ URL (nếu có, để biết đang điểm danh lớp nào)
	const urlParams = new URLSearchParams(window.location.search);
	const classId = urlParams.get('classId');
	
	// Cập nhật tiêu đề với ngày hiện tại và tên lớp (nếu có)
	const today = new Date();
	const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
	
	let className = "Không xác định";
	if (classId) {
		className = {
			'L001': 'Kỹ thuật Phần mềm K20',
			'L002': 'Khoa học Dữ liệu K21',
			'L003': 'Hệ thống Thông tin K19'
		} [classId] || classId;
	}
	attendanceTitleElement.textContent = `Điểm Danh Lớp ${className} - Ngày ${formattedDate}`;
	
	// Dữ liệu sinh viên mẫu (thực tế sẽ lấy từ API/backend dựa vào classId)
	const mockStudentsForAttendance = {
		'L001': [
			{ id: 'SV001', name: 'Phạm Duy Anh' },
			{ id: 'SV002', name: 'Nguyễn Thị Bình' },
			{ id: 'SV003', name: 'Trần Văn Chung' },
			{ id: 'SV004', name: 'Hoàng Kim Dung' }
		],
		'L002': [
			{ id: 'SV005', name: 'Lý Gia Hân' },
			{ id: 'SV006', name: 'Vũ Minh Khôi' }
		],
		'L003': [
			{ id: 'SV007', name: 'Đặng Thanh Lam' }
		]
	};
	
	// Nạp sinh viên vào bảng điểm danh
	if (classId && mockStudentsForAttendance[classId]) {
		let rowsHTML = '';
		mockStudentsForAttendance[classId].forEach(student => {
			rowsHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td class="student-name-col">${student.name}</td> <td class="attendance-status-col">
                        <div class="status-buttons" data-student-id="${student.id}">
                            <button class="status-btn present active" data-status="present">Có mặt</button>
                            <button class="status-btn absent" data-status="absent">Vắng</button>
                            <button class="status-btn late" data-status="late">Đi muộn</button>
                        </div>
                    </td>
                    <td><input type="text" class="attendance-note" data-student-id="${student.id}" placeholder="Ghi chú"></td>
                </tr>
            `;
		});
		attendanceListBody.innerHTML = rowsHTML;
	} else {
		attendanceListBody.innerHTML = '<tr><td colspan="4" style="text-align: center;">Không có dữ liệu sinh viên để điểm danh.</td></tr>';
	}
	
	
	// THÊM ĐOẠN JS NÀY ĐỂ XỬ LÝ SỰ KIỆN CLICK CHO CÁC NÚT TRẠNG THÁI
	attendanceListBody.addEventListener('click', function(event) {
		const target = event.target;
		// Kiểm tra xem phần tử được click có phải là một nút trạng thái không
		if (target.classList.contains('status-btn')) {
			const buttonGroup = target.closest('.status-buttons'); // Tìm div cha chứa nhóm nút
			if (buttonGroup) {
				// Loại bỏ class 'active' khỏi tất cả các nút trong nhóm đó
				buttonGroup.querySelectorAll('.status-btn').forEach(btn => {
					btn.classList.remove('active');
				});
				// Thêm class 'active' vào nút vừa được click
				target.classList.add('active');
			}
		}
	});
	
	
	// Xử lý sự kiện khi nhấn nút "Lưu Điểm Danh"
	saveAttendanceBtn.addEventListener('click', function() {
		const attendanceData = [];
		const studentRows = attendanceListBody.querySelectorAll('tr');
		
		studentRows.forEach(row => {
			const studentIdElement = row.querySelector('.status-buttons');
			const studentId = studentIdElement ? studentIdElement.dataset.studentId : null;
			
			const activeStatusButton = row.querySelector('.status-btn.active');
			const status = activeStatusButton ? activeStatusButton.dataset.status : 'undefined';
			
			const noteInput = row.querySelector('.attendance-note');
			const note = noteInput ? noteInput.value.trim() : '';
			
			if (studentId) {
				attendanceData.push({
					studentId: studentId,
					status: status,
					note: note
				});
			}
			
			// PHẦN MỚI: Thêm xác nhận trực quan bên cạnh tên sinh viên
			const studentNameCell = row.querySelector('.student-name-col'); // Lấy ô chứa tên sinh viên
			if (studentNameCell) {
				let confirmationSpan = studentNameCell.querySelector('.attendance-confirmation');
				if (!confirmationSpan) { // Nếu chưa có span xác nhận, tạo mới
					confirmationSpan = document.createElement('span');
					confirmationSpan.classList.add('attendance-confirmation');
					studentNameCell.appendChild(confirmationSpan);
				}
				
				// Cập nhật nội dung xác nhận dựa trên trạng thái
				let confirmationText = '';
				let confirmationClass = '';
				switch (status) {
					case 'present':
						confirmationText = ' (Đã điểm danh)';
						confirmationClass = 'status-present-text';
						break;
					case 'absent':
						confirmationText = ' (Vắng)';
						confirmationClass = 'status-absent-text';
						break;
					case 'late':
						confirmationText = ' (Đi muộn)';
						confirmationClass = 'status-late-text';
						break;
					default:
						confirmationText = '';
						confirmationClass = '';
						break;
				}
				confirmationSpan.textContent = confirmationText;
				// Xóa các class cũ và thêm class mới để thay đổi màu chữ
				confirmationSpan.classList.remove('status-present-text', 'status-absent-text', 'status-late-text');
				if (confirmationClass) {
					confirmationSpan.classList.add(confirmationClass);
				}
			}
		});
		
		console.log('Dữ liệu điểm danh:', attendanceData);
		alert('Đã lưu dữ liệu điểm danh (xem trong console)! Các xác nhận đã được hiển thị trên bảng.');
		// Trong ứng dụng thực tế, bạn sẽ gửi attendanceData này lên backend (server)
	});
});
