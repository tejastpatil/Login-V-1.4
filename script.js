document.addEventListener("DOMContentLoaded", function () {
  const phaseDropdown = document.getElementById("phaseDropdown");
  const subjectDropdown = document.getElementById("subjectDropdown");
  const pdfTableBody = document.querySelector("#pdfTable tbody");

  const Phases = ["Phase1", "Phase2", "Phase3"];
  const Subjects = {
    Phase1: ["SubjectA", "SubjectB", "SubjectC"],
    Phase2: ["SubjectD", "SubjectE", "SubjectF"],
    Phase3: ["SubjectG", "SubjectH", "SubjectI"],
  };

  const pdfs = {
    Phase1: {
      SubjectA: {
        Category1: [
          { name: "Category1 Manual 1", url: "category1_1.pdf" },
          { name: "Category1 Manual 2", url: "category1_2.pdf" },
        ],
        Category2: [
          { name: "Category2 Manual 1", url: "category2_1.pdf" },
          { name: "Category2 Manual 2", url: "category2_2.pdf" },
        ],
      },
      // ...
    },
    // Define PDFs for other Phases and Subjects similarly
  };
  
  
  Phases.forEach(function (phase) {
    const option = document.createElement("option");
    option.value = phase;
    option.textContent = phase;
    phaseDropdown.appendChild(option);
  });

  function clearDropdown(dropdown) {
    dropdown.innerHTML =
      "<option value=''>Select " +
      dropdown.id.charAt(0).toUpperCase() +
      dropdown.id.slice(1) +
      "</option>";
  }

  phaseDropdown.addEventListener("change", function () {
    clearDropdown(subjectDropdown);

    const selectedPhase = phaseDropdown.value;
    if (selectedPhase) {
      Subjects[selectedPhase].forEach(function (subject) {
        const option = document.createElement("option");
        option.value = subject;
        option.textContent = subject;
        subjectDropdown.appendChild(option);
      });
    }
  });




  function displayPDFLinks(phase, subject) {
    const pdfCategories = pdfs[phase][subject];
    if (pdfCategories) {
      // Clear existing table rows
      pdfTableBody.innerHTML = "";
      let prevSubject = null;
  
      for (const category in pdfCategories) {
        const pdfArray = pdfCategories[category];
        if (pdfArray) {
          pdfArray.forEach(function (pdf, index) {
            const newRow = pdfTableBody.insertRow();
            const phaseCell = newRow.insertCell(0);
            const subjectCell = newRow.insertCell(1);
            const topicCell = newRow.insertCell(2);
            const buttonCell = index === 0 ? newRow.insertCell(3) : null; // Only add button in the first row of each category
  
            if (index === 0 || subject !== prevSubject) {
              phaseCell.textContent = subject === prevSubject ? "" : phase;
              subjectCell.textContent = subject;
              prevSubject = subject;
            }
  
            // Concatenate category within the topic cell
            topicCell.textContent = pdf.name;
  
            if (index === 0) {
              const pdfButton = document.createElement("button");
              pdfButton.textContent = `Open IETM`;
              pdfButton.addEventListener("click", function () {
                // Assuming you want to open the first PDF in the category when the button is clicked
                window.open(pdfArray[0].url, "_blank");
              });
  
              if (buttonCell) {
                buttonCell.appendChild(pdfButton);
                buttonCell.style.textAlign = "center"; // Center-align the button
              }
            }
          });
        }
      }
    } else {
      alert("No PDFs available for the selected Phase and Subject.");
    }
  }
  
  


  
  
  


  
  
  
  document.getElementById("submitBtn").addEventListener("click", function () {
    const selectedPhase = phaseDropdown.value;
    const selectedSubject = subjectDropdown.value;
  
    if (selectedPhase && selectedSubject) {
      pdfTableBody.innerHTML = ""; 
      displayPDFLinks(selectedPhase, selectedSubject);
  
      const tableHeader = document.querySelector("#pdfTable thead");
      tableHeader.removeAttribute("hidden");
    } else {
      alert("Please select both Phase and Subject.");
    }
  });
  
});
