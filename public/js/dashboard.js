const searchBar = document.querySelector(".search-input");
const btnDelete = document.querySelector(".btn-delete");
const btnSearch = document.querySelector(".search-btn");

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const anchor = document.createElement("a");
    anchor.setAttribute("href", `?search=${e.target.value}`);
    anchor.click();
    anchor.remove();
  }
});

btnSearch.addEventListener("click", () => {
  const anchor = document.createElement("a");
  anchor.setAttribute("href", `?search=${searchBar.value}`);
  anchor.click();
  anchor.remove();
});

btnDelete.addEventListener("click", (e) => {
  if (!confirm("Anda yakin ingin menghapus dokumen ini ?")) {
    e.preventDefault();
  }
  return;
});
