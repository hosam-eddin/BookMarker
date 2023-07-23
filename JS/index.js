var siteName = document.getElementById('siteName')
var siteUrl = document.getElementById('siteUrl')
var alert1 = document.getElementById('alert1')
var alert2 = document.getElementById('alert2')



var siteContainer = []


if (localStorage.getItem("sites") != null) {
  siteContainer = JSON.parse(localStorage.getItem("sites"));
  displaySites(siteContainer);
} //! will return value


function addSite() {
  if (validateSiteName() && validateSiteUrl() && unique() != false) {
    var site = {
      siteInputName: siteName.value,
      url: siteUrl.value
    }
    siteContainer.push(site)
    displaySites(siteContainer)
    localStorage.setItem("sites", JSON.stringify(siteContainer))
    clearForm();
    siteName.classList.remove('is-valid')
    siteUrl.classList.remove('is-valid')
  } else {
    alert(`
    -> Site name must contain at least 3 characters

    -> Site URL must be a valid one & contain
    (http://) or (wwww.) | (.com) at the end`)
  }

}


function displaySites(list) {
  var cartona = ''
  for (var i = 0; i < list.length; i++) {
    cartona += `           
    <tr>
      <td> ${i + 1} </td>
      <td> ${list[i].siteInputName} </td>
      <td>
        <a href="${siteContainer[i].url}" target="_blank" class="btn btn-success text-white">
          <i class="fa-solid fa-eye pe-2"></i>
          visit
        </a>
      </td>
      <td> <button onclick="deleteProduct()" class="btn btn-danger">
          <i class="fa-solid fa-trash-can pe-2"></i>
          delete
        </button>
      </td>
    </tr> `
  }
  document.getElementById('tableBody').innerHTML = cartona
}


//! clearForm - Called in Main-Function 
function clearForm() {
  siteName.value = "";
  siteUrl.value = "";
}


//! delete Function
function deleteProduct(productIndex) {
  siteContainer.splice(productIndex, 1);
  displaySites(siteContainer)
  localStorage.setItem("sites", JSON.stringify(siteContainer))
}


// !regex
function validateSiteName() {
  var regex = /^\w{3,}(\s+\w+)*$/
  if (regex.test(siteName.value)) {
    siteName.classList.add('is-valid')
    siteName.classList.remove('is-invalid')
    alert1.classList.add("d-none")
    return true
  }
  else {
    siteName.classList.add('is-invalid')
    siteName.classList.remove('is-valid')
    alert1.classList.remove("d-none")
    alert1.innerHTML="Site name must contain at least 3 characters"
    return false
  }
}
function validateSiteUrl() {
  var regex = /^(https?:\/\/)|(w{3}\.)\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
  if (regex.test(siteUrl.value)) {
    siteUrl.classList.add('is-valid')
    siteUrl.classList.remove('is-invalid')
    alert2.classList.add("d-none")
    return true
  }
  else {
    siteUrl.classList.add('is-invalid')
    siteUrl.classList.remove('is-valid')
    alert2.classList.remove("d-none")
    alert2.innerHTML="Site URL must be a valid one & contain (http://) or (wwww.) | (.com) at the end"
    return false
  }
}


function unique() {
  for (var i = 0; i < siteContainer.length; i++) {
    if (siteContainer[i].siteInputName == siteName.value)
      return false;
  }
}


/* !return :Swal is undefined when i used it 
Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: 'Something went wrong!',
})
*/




