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
      SubjectA: [
        { name: "SubjectA Manual 1", url: "subjectA_1.pdf" },
        { name: "SubjectA Manual 2", url: "subjectA_2.pdf" },
      ],
      SubjectB: [
        { name: "SubjectB Manual 1", url: "subjectB_1.pdf" },
        { name: "SubjectB Manual 2", url: "subjectB_2.pdf" },
      ],
      SubjectC: [
        { name: "SubjectC Manual 1", url: "subjectC_1.pdf" },
        { name: "SubjectC Manual 2", url: "subjectC_2.pdf" },
      ],
    },
    Phase2: {
      SubjectD: [
        { name: "SubjectD Manual 1", url: "subjectD_1.pdf" },
        { name: "SubjectD Manual 2", url: "subjectD_2.pdf" },
      ],
      SubjectE: [
        { name: "SubjectE Manual 1", url: "subjectE_1.pdf" },
        { name: "SubjectE Manual 2", url: "subjectE_2.pdf" },
      ],
      SubjectF: [
        { name: "SubjectF Manual 1", url: "subjectF_1.pdf" },
        { name: "SubjectF Manual 2", url: "subjectF_2.pdf" },
      ],
    },
    Phase3: {
      SubjectG: [
        { name: "SubjectG Manual 1", url: "subjectG_1.pdf" },
        { name: "SubjectG Manual 2", url: "subjectG_2.pdf" },
      ],
      SubjectH: [
        { name: "SubjectH Manual 1", url: "subjectH_1.pdf" },
        { name: "SubjectH Manual 2", url: "subjectH_2.pdf" },
      ],
      SubjectI: [
        { name: "SubjectI Manual 1", url: "subjectI_1.pdf" },
        { name: "SubjectI Manual 2", url: "subjectI_2.pdf" },
      ],
    },
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
    const pdfArray = pdfs[phase][subject];
    if (pdfArray) {
      pdfArray.forEach(function (pdf) {
        const newRow = pdfTableBody.insertRow();
        const phaseCell = newRow.insertCell(0);
        const subjectCell = newRow.insertCell(1);
        const nameCell = newRow.insertCell(2);
        const linkCell = newRow.insertCell(3);

        const pdfLink = document.createElement("a");
        pdfLink.href = pdf.url;
        pdfLink.textContent = pdf.name;
        pdfLink.target = "_blank";

        nameCell.textContent = pdf.name;
        linkCell.appendChild(pdfLink);
        phaseCell.textContent = phase;
        subjectCell.textContent = subject;
      });
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
