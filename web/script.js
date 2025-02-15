document.getElementById("application-form").addEventListener("submit", function(event) {
  event.preventDefault(); // منع إرسال النموذج

  const formData = new FormData(this);
  const email = formData.get("email");

  // التحقق من البريد الإلكتروني إذا كان قد تم استخدامه من قبل
  if (localStorage.getItem(email)) {
    document.getElementById("email-error").textContent = "❌ لقد تم تقديم طلب بهذا البريد الإلكتروني مسبقًا!";
    return;
  }

  // حفظ البريد الإلكتروني في localStorage لمنع التقديم مرة أخرى
  localStorage.setItem(email, "submitted");

  // عرض النافذة المنبثقة
  document.querySelector(".popup").style.display = "flex";
  document.querySelector(".bb").addEventListener("click", () => {
    window.location.reload();
  });

  // إرسال البيانات إلى تيليجرام
  const botToken = "5974407787:AAHWCRET9irpCYJ7Y0CzaktAlXFb_O5_q4M";
  const chatId = "1401937917";
  const apiUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

  const message = `
  📝 *طلب جديد للانضمام إلى فريق Tovex* 📝

  🔹 *الاسم:* ${formData.get("name")}
  🔹 *البريد الإلكتروني:* ${email}
  🔹 *موافقة على البنود:* ${formData.get("terms") ? "✅ نعم" : "❌ لا"}
  `;

  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
    headers: { "Content-Type": "application/json" }
  });
});

// عرض رابط تيليجرام في حالة حدوث مشكلة
document.getElementById("email-error").innerHTML += `<br>إذا واجهتك مشكلة <a href="https://t.me/is_baher" target="_blank" style="color: green;"> راسل المطور</a>`;

