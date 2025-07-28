const can = ["Giáp", "Ất", "Bính", "Đinh", "Mậu", "Kỷ", "Canh", "Tân", "Nhâm", "Quý"];
const chi = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];

document.getElementById("birthForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const birthdayInput = document.getElementById("birthday").value;
  const hourInput = document.getElementById("hour").value;
  const houseYear = parseInt(document.getElementById("houseYear").value);
  const houseDirection = document.getElementById("houseDirection").value;

  if (!birthdayInput || hourInput === "") {
    alert("Vui lòng nhập đầy đủ ngày sinh và giờ sinh.");
    return;
  }

  const birthday = new Date(birthdayInput);
  const hour = parseInt(hourInput);
  const gender = document.getElementById("gender").value;
  const year = birthday.getFullYear();
  const now = new Date().getFullYear();

  const canChiNam = `${can[(year + 6) % 10]} ${chi[(year + 8) % 12]}`;
  const gioChi = chi[Math.floor(hour / 2) % 12];

  const cung = getCungPhi(year, gender);
  const ketQuaKimLau = tinhKimLau(year, now);
  const ketQuaHoangOc = tinhHoangOc(year, now);
  const ketQuaTamTai = tinhTamTai(year, now);
  const ketQuaNgayTot = danhGiaNgayTotXau(birthday, year);
  const huongNha = goiYHuongNha(cung);
  const ketQuaHuyenKhong = phanTichHuyenKhong(houseDirection, houseYear);

  const resultBox = document.getElementById("result");
  resultBox.innerHTML = `
    <h2>Kết quả phân tích</h2>
    <p><strong>Năm sinh (Can Chi):</strong> ${canChiNam}</p>
    <p><strong>Giờ sinh (Chi):</strong> ${gioChi}</p>
    <p><strong>Cung phi:</strong> ${cung.ten} – Hành ${cung.hanh}</p>
    <p><strong>Hướng tốt:</strong> ${cung.huongTot.join(", ")}</p>
    <p><strong>Tuổi âm lịch năm nay:</strong> ${ketQuaKimLau.tuoiAm}</p>
    <p><strong>Kim Lâu:</strong> ${ketQuaKimLau.loai}</p>
    <p><strong>Hoang Ốc:</strong> ${ketQuaHoangOc.ketQua}</p>
    <p><strong>Tam Tai:</strong> ${ketQuaTamTai.ketQua}</p>
    <p><strong>Gợi ý hướng nhà hợp tuổi:</strong> ${huongNha}</p>
    <p><strong>Đánh giá ngày hôm nay:</strong> ${ketQuaNgayTot}</p>
    <p><strong>Huyền Không Phi Tinh:</strong> ${ketQuaHuyenKhong}</p>
  `;
});

function getCungPhi(year, gender) {
  const nam = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const nu = [5, 6, 7, 8, 9, 1, 2, 3, 4];
  let tong = year.toString().split("").reduce((a, b) => a + parseInt(b), 0);
  while (tong > 9) tong = tong.toString().split("").reduce((a, b) => a + parseInt(b), 0);
  const cungSo = gender === "nam" ? nam[tong - 1] : nu[tong - 1];
  const cungMap = {
    1: { ten: "Khảm", hanh: "Thủy", huongTot: ["Bắc", "Đông", "Nam", "Đông Nam"] },
    2: { ten: "Khôn", hanh: "Thổ", huongTot: ["Tây", "Tây Nam", "Tây Bắc", "Đông Bắc"] },
    3: { ten: "Chấn", hanh: "Mộc", huongTot: ["Bắc", "Đông", "Nam", "Đông Nam"] },
    4: { ten: "Tốn", hanh: "Mộc", huongTot: ["Bắc", "Đông", "Nam", "Đông Nam"] },
    5: {
      ten: gender === "nam" ? "Cấn" : "Khôn",
      hanh: "Thổ",
      huongTot: ["Tây", "Tây Nam", "Tây Bắc", "Đông Bắc"],
    },
    6: { ten: "Càn", hanh: "Kim", huongTot: ["Tây", "Tây Nam", "Tây Bắc", "Đông Bắc"] },
    7: { ten: "Đoài", hanh: "Kim", huongTot: ["Tây", "Tây Nam", "Tây Bắc", "Đông Bắc"] },
    8: { ten: "Cấn", hanh: "Thổ", huongTot: ["Tây", "Tây Nam", "Tây Bắc", "Đông Bắc"] },
    9: { ten: "Ly", hanh: "Hỏa", huongTot: ["Bắc", "Đông", "Nam", "Đông Nam"] },
  };
  return cungMap[cungSo];
}

function goiYHuongNha(cung) {
  const goiY = {
    "Khảm": "Hợp hướng: Bắc, Đông, Nam, Đông Nam",
    "Ly": "Hợp hướng: Bắc, Đông, Nam, Đông Nam",
    "Chấn": "Hợp hướng: Bắc, Đông, Nam, Đông Nam",
    "Tốn": "Hợp hướng: Bắc, Đông, Nam, Đông Nam",
    "Càn": "Hợp hướng: Tây, Tây Bắc, Tây Nam, Đông Bắc",
    "Khôn": "Hợp hướng: Tây, Tây Bắc, Tây Nam, Đông Bắc",
    "Cấn": "Hợp hướng: Tây, Tây Bắc, Tây Nam, Đông Bắc",
    "Đoài": "Hợp hướng: Tây, Tây Bắc, Tây Nam, Đông Bắc",
  };
  return goiY[cung.ten] || "Không xác định";
}

function danhGiaNgayTotXau(birthday, year) {
  const chiNguoi = chi[(birthday.getFullYear() + 8) % 12];
  const today = new Date();
  const chiNgay = chi[(today.getDate() + 8) % 12];
  const capXung = {
    "Tý": "Ngọ", "Sửu": "Mùi", "Dần": "Thân", "Mão": "Dậu",
    "Thìn": "Tuất", "Tỵ": "Hợi", "Ngọ": "Tý", "Mùi": "Sửu",
    "Thân": "Dần", "Dậu": "Mão", "Tuất": "Thìn", "Hợi": "Tỵ"
  };
  if (capXung[chiNguoi] === chiNgay) {
    return `❌ Hôm nay (${chiNgay}) xung với tuổi (${chiNguoi}) – Không nên thực hiện việc quan trọng.`;
  } else {
    return `✅ Hôm nay (${chiNgay}) không xung tuổi – Có thể xem là ngày tạm ổn.`;
  }
}

function tinhKimLau(namSinh, namXem) {
  const tuoiAm = namXem - namSinh + 1;
  const du = tuoiAm % 9;
  let loai = "Không phạm Kim Lâu";
  if (du === 1) loai = "Kim Lâu Thân – Hại bản thân";
  if (du === 3) loai = "Kim Lâu Thê – Hại vợ chồng";
  if (du === 6) loai = "Kim Lâu Tử – Hại con cái";
  if (du === 8) loai = "Kim Lâu Súc – Hại tài sản, không nên làm nhà";
  return { tuoiAm, loai };
}

function tinhHoangOc(namSinh, namXem) {
  const tuoiAm = namXem - namSinh + 1;
  const du = tuoiAm % 6;
  const map = {
    1: "Nhất Cát – Tốt, có thể xây nhà",
    2: "Nhì Nghi – Tốt, làm nhà phát đạt",
    3: "Tam Địa Sát – Xấu, dễ bệnh tật",
    4: "Tứ Tấn Tài – Tốt, may mắn tài lộc",
    5: "Ngũ Thọ Tử – Xấu, chia ly",
    0: "Lục Hoang Ốc – Xấu, tránh làm nhà",
  };
  return { tuoiAm, ketQua: map[du] };
}

function tinhTamTai(namSinh, namXem) {
  const chiList = ["Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi"];
  const chiSinh = chiList[(namSinh + 8) % 12];
  const chiXem = chiList[(namXem + 8) % 12];
  const tamTaiMap = {
    "Thân": ["Dần", "Mão", "Thìn"], "Tý": ["Dần", "Mão", "Thìn"], "Thìn": ["Dần", "Mão", "Thìn"],
    "Dậu": ["Tỵ", "Ngọ", "Mùi"], "Sửu": ["Tỵ", "Ngọ", "Mùi"], "Tỵ": ["Tỵ", "Ngọ", "Mùi"],
    "Hợi": ["Thân", "Dậu", "Tuất"], "Mão": ["Thân", "Dậu", "Tuất"], "Mùi": ["Thân", "Dậu", "Tuất"],
    "Ngọ": ["Hợi", "Tý", "Sửu"], "Dần": ["Hợi", "Tý", "Sửu"]
  };
  const dangTamTai = tamTaiMap[chiSinh]?.includes(chiXem) || false;
  return {
    chiSinh,
    chiXem,
    ketQua: dangTamTai ? "⚠️ Năm nay đang vào Tam Tai" : "✅ Không phạm Tam Tai",
  };
}

function xacDinhVan(namXay) {
  if (namXay >= 2004 && namXay <= 2023) return 8;
  if (namXay >= 2024 && namXay <= 2043) return 9;
  return null;
}

function phanTichHuyenKhong(huong, namXay) {
  const van = xacDinhVan(namXay);
  if (!van) return "❌ Không phân tích được vì năm xây nhà ngoài phạm vi Vận 8–9.";
  const ketQuaVan8 = {
    "Bắc": "Hướng sinh khí, vượng tài – lợi nhân đinh.",
    "Nam": "Hướng hao khí, tài suy – dễ bệnh tật.",
    "Đông": "Khá tốt nếu minh đường thoáng, hợp Mộc.",
    "Tây": "Vượng về nữ, tài ổn định.",
    "Đông Bắc": "Hướng hung – dễ hao tài.",
    "Đông Nam": "Vượng tài nhưng nhân đinh yếu.",
    "Tây Nam": "Khá tốt nếu sau nhà có núi/tường cao.",
    "Tây Bắc": "Tốt cho quyền lực, uy tín.",
  };
  const ketQuaVan9 = {
    "Bắc": "Khá tốt về nhân đinh, tránh mở cửa chính lớn.",
    "Nam": "Cực vượng tài – nhân đinh – đại cát!",
    "Đông": "Vượng nữ – tài trung bình.",
    "Tây": "Kém – dễ phát bệnh vặt.",
    "Đông Bắc": "Tốt nếu cửa trước hướng này.",
    "Đông Nam": "Hung nếu nhà nữ ở một mình.",
    "Tây Nam": "Trung bình – nên hóa giải nếu ở lâu dài.",
    "Tây Bắc": "Vượng quyền uy, dễ thăng tiến.",
  };
  const ketQua = van === 8 ? ketQuaVan8[huong] : ketQuaVan9[huong];
  return `🏯 Vận ${van} – Hướng ${huong}: ${ketQua}`;
}
