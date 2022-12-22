const inputFile = document.querySelector("#file");
const previewFile = document.querySelector("#preview");
const inputKategori = document.querySelector("#kategori");
const inputKategoribaru = document.querySelector("#filekategori");
const btnCancel = document.querySelector("#button-cancel");
const btnInputFile = document.querySelector("#btn-input");
const kategoriSelected = inputKategori.dataset.kategoriSelected;
// console.log(inputKategori.options);
// previewFile.style.display = "none";

inputFile.addEventListener("change", (event) => {
  previewFile.setAttribute("data", URL.createObjectURL(event.target.files[0]));
  if (!event.target.files[0]) {
    btnInputFile.innerHTML = "Input File";
  }
  btnInputFile.innerHTML = "Change File";
  previewFile.style.display = "block";
});

inputKategori.addEventListener("change", (e) => {
  if (e.target.value === "Kategori baru") {
    inputKategori.setAttribute("name", "kategoriunused");
    inputKategoribaru.setAttribute("name", "filekategori");
    inputKategori.style.display = "none";
    inputKategoribaru.style.display = "block";
    btnCancel.style.display = "block";
  }
});

btnCancel.addEventListener("click", (e) => {
  inputKategori.setAttribute("name", "filekategori");
  inputKategoribaru.setAttribute("name", "kategoriunused");
  inputKategori.style.display = "block";
  inputKategoribaru.style.display = "none";
  !kategoriSelected ? (inputKategori.options.selectedIndex = 0) : (inputKategori.value = kategoriSelected);
  btnCancel.style.display = "none";
});
