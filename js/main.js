const formContainer = document.getElementById('formContainer'); 
var empRecords = [];


formContainer.addEventListener('submit', (event) => {
    event.preventDefault();
    formValidation()
    getFormData();
    resetForm();
});

function getFormData() {
    var fname = document.getElementById('fullName').value;
    var address = document.getElementById('address').value;
    var emailAddress = document.getElementById('emailAddress').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var dateOfBirth = document.getElementById('dateOfBirth').value;

    var empPost = getEmpPost(); 

    var empPhoto = getEmpPhoto();
    var regDate = new Date().toISOString().split('T')[0];

    var genderData = getGenderValue();

    var empData = {
        FullName: fname,
        Address: address,
        EmailAddress: emailAddress,
        PhoneNumber: phoneNumber,
        DateOfBirth: dateOfBirth,
        EmployeePost: empPost,
        RegistrationDate: regDate,
        Gender: genderData,
        EmpolyeePhoto: empPhoto 
    };

    empRecords.push(empData);
    showDetails(empRecords);
   
}

function resetForm() {
    var fname = document.getElementById('fullName').value = '';
    var address = document.getElementById('address').value = '';
    var emailAddress = document.getElementById('emailAddress').value = '';
    var phoneNumber = document.getElementById('phoneNumber').value = '';
    var dateOfBirth = document.getElementById('dateOfBirth').value = '';
    
}

function getGenderValue() {
    let maleRadio = document.getElementById('maleRadio');
    let femaleRadio = document.getElementById('femaleRadio');
    
    if(maleRadio.checked==true) {
        return(maleRadio.value);
    }
    else if(femaleRadio.checked==true) {
        return(femaleRadio.value);
    }
}

function getEmpPost() {
    let empPost = document.getElementById('postSelect');
    let selectedPost = empPost.options[empPost.selectedIndex].text;

    if(selectedPost == "Choose your post") {
        document.querySelector('.emppost').innerHTML ='Post kidar hey???';
        document.getElementById('postSelect').classList.add('error-input');
    }

    return selectedPost;
}

function getEmpPhoto(){
    let imgList =[];
    let img = document.getElementById('empPhoto');
    var files = !!img.files ? img.files : [];
    var reader = new FileReader(); // instance of the FileReader
    reader.readAsDataURL(files[0]) // read the local file
    reader.onloadend = function (event) { // set image data as background of div
        var dataUri = event.target.result;
        
        let imgPath = {
            image: dataUri
        }
        
        imgList.push(imgPath);
        
        // let display = imgList.map(function(item) {
        //     return `<img src="${item.image}"`;
        // });
    }
    return(imgList);
}

function formValidation() {
    var fname = document.getElementById('fullName').value;
    var address = document.getElementById('address').value;
    var emailAddress = document.getElementById('emailAddress').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var dateOfBirth = document.getElementById('dateOfBirth').value;

    var empPost = getEmpPost(); 

    var empPhoto = getEmpPhoto();
    var regDate = new Date().toISOString().split('T')[0];

    var genderData = getGenderValue();

    let isValid = true;

    let inputElements = formContainer.getElementsByTagName('input');
    const namePattern = /^[a-zA-Z`-]+(\s[a-zA-Z`-]+)*$/;
    const addressPattern = /^[a-zA-Z0-9\s\-\.\,\#]+$/;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const phonePattern = /^(\+977\s)?9\d{9}$/;

    Array.from(inputElements).forEach(input => {
        const inputValue = input.value.trim();
        const inputName = input.name;
        const inputType = input.type;
        
        if(inputName == 'fullName' && inputValue == '') {
            document.querySelector('.fullname').innerHTML = 'Please enter your name.';
            document.getElementById('fullName').classList.add('error-input');
            isValid = false;
            
        } else if (inputType == 'text' && inputName == 'fullName') {
            if(!namePattern.test(inputValue)){
                document.querySelector('.fullname').innerHTML = 'Please enter valid name.';
                document.getElementById('fullName').classList.add('error-input');
                isValid = false;
            }
        }

        else if(inputName == 'address' && inputValue == '') {
            document.querySelector('.address').innerHTML ='Please enter your address.';
            document.getElementById('address').classList.add('error-input');
            isValid = false;
            
        } else if (inputType == 'text' && inputName == 'address') {
            if(!addressPattern.test(inputValue)) {
                document.querySelector('.address').innerHTML ='Please enter valid address.';
                document.getElementById('address').classList.add('error-input');
                isValid = false;
            }
        }

        else if(inputName == 'emailAddress' && inputValue == '') {
            document.querySelector('.emailaddress').innerHTML ='Please enter your email address.';
            document.getElementById('emailAddress').classList.add('error-input');
            isValid = false;
            
        } else if (inputType == 'email' && inputName == 'emailAddress') {
            if(!emailPattern.test(inputValue)) {
                document.querySelector('.emailaddress').innerHTML ='Please enter valid email address.';
                document.getElementById('emailAddress').classList.add('error-input');
                isValid = false;
            }
        }

        else if(inputName == 'phoneNumber' && inputValue == '') {
            document.querySelector('.phonenumber').innerHTML ='Please enter your phone number.';
            document.getElementById('phoneNumber').classList.add('error-input');
            isValid = false;
            
        } else if (inputType == 'text' && inputName == 'phoneNumber') {
            if(!phonePattern.test(inputValue)) {
                document.querySelector('.phonenumber').innerHTML ='Please enter valid phone number.';
                document.getElementById('phoneNumber').classList.add('error-input');
                isValid = false;
            }
        }

        else if(inputName == 'dateOfBirth' && inputValue == '') {
            document.querySelector('.dateofbirth').innerHTML ='Please enter your date of birth.';
            document.getElementById('dateOfBirth').classList.add('error-input');
            isValid = false;
            
        } else if(inputType == 'date' && inputName == 'dateOfBirth') {
            let dob = inputValue;
            let currentDate = new Date().toISOString().split('T')[0];
            if(dob > currentDate) {
                document.querySelector('.dateofbirth').innerHTML ='Please enter valid date of birth.';
                document.getElementById('dateOfBirth').classList.add('error-input');
                isValid = false;
            }
        }

        else if(inputName == 'empPhoto' && inputValue == '') {
            document.getElementById('empPhoto').classList.add('error-input');
            isValid = false;
        } 
        return isValid;
    });
}

function showDetails(empData) {
    var add = '';

    empRecords.forEach((empData, index) => {
        add += `
                <tr class="table-row">
                    <td onclick="empDetail(${index})">${empData.FullName}</td>
                    <td onclick="empDetail(${index})">${empData.Address}</td>
                    <td onclick="empDetail(${index})">${empData.Gender}</td>
                    <td onclick="empDetail(${index})">${empData.EmailAddress}</td>
                    <td onclick="empDetail(${index})">${empData.EmployeePost}</td>
                    <td> 
                        <button onclick="deleted(${index})">Delete</button>
                    </td>
                </tr>
        `;
    });
    document.getElementById("table-body").innerHTML = add;
}

function deleted(index) {
    let result = confirm('Are you Sure??');
    if (result) {
        empRecords.splice(index,1);
        showDetails(empRecords);
    } 
}

function empDetail(index) {
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    span.onclick = function() {
    modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    let infoSec = document.querySelector('.info-sec');
    let photoSec = document.querySelector('.photo-sec');
    let currentDate = new Date().toISOString().split('T')[0];
    let detail = empRecords[index];

    // console.log(detail.EmpolyeePhoto[0].image);

    photoSec.innerHTML = `
    <img src="${detail.EmpolyeePhoto[0].image}" alt="team" style="height: 250px; width: 250px; border-radius: 10px;">
    `;

    infoSec.innerHTML = `
        <h3><b>${addressEmp()} ${detail.FullName}</b></h3>
        <hr>
        <h6><b>Address:</b> ${detail.Address}</h6>
        <h6><b>Email Address:</b> ${detail.EmailAddress}</h6>
        <h6><b>Phone Number:</b> ${detail.PhoneNumber}</h6>
        <h6><b>DOB:</b> ${detail.DateOfBirth}</h6>
        <h6><b>Age:</b> ${age()}</h6>
        <h6><b>Position:</b> ${detail.EmployeePost}</h6>
        <h6><b>Registered Date:</b> ${detail.RegistrationDate}</h6>
        <h6><b>Gross Salary:</b> ${salary()}</h6>
        <h6><b>Net Salary:</b> ${grossSalary()}</h6>

     `;

    function salary() {
        if(detail.EmployeePost == 'CEO') {
            return 100000;
        }
        else if(detail.EmployeePost == 'CTO') {
            return 90000;
        }
    }

    function addressEmp() {
        if(detail.Gender == 'Male') {
            return 'MR.'
        }
        else if(detail.Gender == 'Female') {
            return 'MRs.';
        }
    }

    function age() {
        let birthYear = new Date(detail.DateOfBirth).getFullYear();
        let currentYear = new Date().getFullYear();
        var age = currentYear - birthYear;
      
        return age;
    }

    function grossSalary() {
        var totalSalary = salary();
        var gSalary = 0;

        var taxDedu = totalSalary - (totalSalary * 0.2);
        gSalary = taxDedu;

        var insuranceDedu = gSalary - 500;
        gSalary = insuranceDedu;

        var serviceCharge = gSalary - (gSalary * 0.02);
        gSalary = serviceCharge;

        let salaryTable = document.querySelector('.salaryTable');

        salaryTable.innerHTML = `
            <tr>
                <td>Gross Salary</td>
                <td>${totalSalary}</td>
            </tr>
            <tr>
                <td>20% Tax</td>
                <td>${taxDedu}</td>
            </tr>
            <tr>
                <td>500rs Insurance</td>
                <td>${insuranceDedu}</td>
            </tr>
            <tr>
                <td>2% Service Charge</td>
                <td>${serviceCharge}</td>
            </tr>
            <tr>
                <td><b>Total Net Salary</b></td>
                <td><b>${gSalary}</b></td>
            </tr>
        `;

        return gSalary;
        
    }

   
}