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
      let currentCategory = null; // Track the current category
      let currentSubject = null; // Track the current subject
  
      for (const category in pdfCategories) {
        const pdfArray = pdfCategories[category];
        if (pdfArray) {
          pdfArray.forEach(function (pdf, index) {
            const newRow = pdfTableBody.insertRow();
            const phaseCell = newRow.insertCell(0);
            const subjectCell = newRow.insertCell(1);
            const topicCell = newRow.insertCell(2);
            const buttonCell = newRow.insertCell(3);
  
            // Only display phase for the first row of each subject group
            if (currentSubject !== subject) {
              phaseCell.textContent = phase;
              currentSubject = subject;
            }
  
            // Only display subject for the first row of each category
            if (currentCategory !== category) {
              subjectCell.textContent = subject;
              currentCategory = category;
            }
  
            // Concatenate category within the topic cell
            topicCell.textContent = pdf.name;
  
            // Add a button for the first row of each category
            if (currentCategory !== category || index === 0) {
              const pdfButton = document.createElement("button");
              pdfButton.textContent = "Open IETM";
              pdfButton.addEventListener("click", function () {
                window.open(pdf.url, "_blank");
              });
              buttonCell.appendChild(pdfButton);
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
