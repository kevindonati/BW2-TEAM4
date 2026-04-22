const gridContainer = document.getElementById("grid-container");

for (let i = 1; i <= 52; i++) {
  let extension = "jpg";
  if (i >= 42 && i <= 45) extension = "png";
  if ([1, 13, 25, 37, 46, 48].includes(i)) extension = "jpeg";

  const cardHtml = `
    <div class="col">
      <div class="card-spotify p-1 h-100 rounded-2">
        <img src="./assets/imgs/search/image-${i}.${extension}" class="img-fluid w-100 rounded-2">
      </div>
    </div>
  `;

  gridContainer.innerHTML += cardHtml;
}
