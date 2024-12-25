document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("forma");
    const responseMessage = document.getElementById("responseMessage");
    const submitButton = document.getElementById("submitButton");

    submitButton.addEventListener("click", async (e) => {
      e.preventDefault();

        const name = document.getElementById("fio").value;
        const phone = document.getElementById("tel").value;
        const email = document.getElementById("email").value;
        const comment = document.getElementById("soob").value;

        // Проверка на пустые поля (можно добавить больше валидаций)
        if (!name || !phone || !email || !comment) {
            responseMessage.textContent = "Заполните все поля!";
            responseMessage.style.color = "red";
            return; // Прерываем отправку
        }


      try {
        const response = await fetch(
          `https://api.telegram.org/bot6225547753:AAFVEl4lSZ4G0cN-zmZAL1O3LTu4dBDf7ug/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chat_id: 5106244821, // Замените на ID чата админа
              text: `Новая заявка:\nИмя: ${name} \nТелефон: ${phone} \nEmail: ${email}\nКомментарий: ${comment}`,
            }),
          }
        );

        if (response.ok) {
          feedbackForm.reset(); // clear form
          alert("Форма успешно отправлена!");
        } else {
          throw new Error("Ошибка отправки сообщения в Telegram");
        }
      } catch (error) {
        responseMessage.textContent = error.message;
        responseMessage.style.color = "red";
      }
    });
});