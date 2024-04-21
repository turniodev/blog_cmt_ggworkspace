const h1 = document.querySelector("h1");
const submitBtn = document.getElementById("submit");
const hide_content = document.getElementById("hide_content");

submitBtn.addEventListener("click", () => {
  const data = editor.getData();
  hide_content.innerHTML = data;
  const imgs = hide_content.querySelectorAll("img");
  console.log(imgs);
  const postData = [];
  imgs.forEach((img, index) => {
    const startIndex = img.src.indexOf(":");
    const endIndex = img.src.indexOf(";");
    const type = img.src.slice(startIndex + 1, endIndex);
    postData[index] = {
      name: `${h1.innerText}${index}`,
      type: type,
      data: img.src.split(",")[1],
    };
  });
  postFile(postData);
});
async function postFile(postData) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxQrJu1fqb3Zri8McPrYBgmk09n9ep05Schx50vNUyF3JURp1SnPbPh6dNDoonck_V1/exec",
      {
        method: "POST",
        body: JSON.stringify(postData),
      }
    );
    const data = await response.json();
    const imgs = hide_content.querySelectorAll("img");
    imgs.forEach((img, index) => {
      img.src = data[index].link;
    });
    const content = hide_content.innerHTML;
    console.log(content);
    postToSheets(content);
  } catch (error) {
    alert("Vui lòng thử lại");
  }
}

async function postToSheets(content) {
  const formData = new FormData();
  formData.append("entry.191667853", h1.innerText);
  formData.append("entry.722060144", content);
  fetch(
    "https://docs.google.com/forms/d/e/1FAIpQLSeQFvQoJ18cDgXpiePCz_ipw7D0XTZ3wKSq5JmbN3N3zNZvZg/formResponse",
    {
      method: "POST",
      body: formData,
      mode: "no-cors",
    }
  );
}
