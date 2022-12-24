const searchBar = document.querySelector(".bubblesearch");
const btnDelete = document.querySelector(".btn-delete");

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `?search=${e.target.value}`);
    anchor.click();
    anchor.remove();
  }
});

btnDelete.addEventListener("click", (e) => {
  if (!confirm("Anda yakin ingin menghapus dokumen ini ?")) {
    e.preventDefault();
  }
  return;
});
