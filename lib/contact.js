	function showOptions() {
        var optionSelected = document.getElementById("option").value;
        var classesSection = document.getElementById("classesSection");
        var careersSection = document.getElementById("careersSection");
        var storySection = document.getElementById("storySection");

        // Hide all sections initially
        classesSection.style.display = "none";
        careersSection.style.display = "none";
        storySection.style.display = "none";

        // Show the selected section
        if (optionSelected === "2") { // Classes
            classesSection.style.display = "block";
        } else if (optionSelected === "1") { // Careers
            careersSection.style.display = "block";
        } else if (optionSelected === "3") { // Our Story
            storySection.style.display = "block";
        }
    }

    function Contact() {
        var optionSelected = document.getElementById("option").value;
        var name = "";
        var email = "";
        var day = "";
        var level = "";


        if (optionSelected === "1") { // Careers
            name = document.getElementById("careerName").value;
            email = document.getElementById("careerEmail").value;
            role = document.getElementById("role").value;
            availability = document.getElementById("availability").value;
        } else if (optionSelected === "2") { // Classes
            day = document.getElementById("day").value;
            level = document.getElementById("level").value;
            name = document.getElementById("contactName").value;
            email = document.getElementById("contactEmail").value;
        } else if (optionSelected === "3") { // Our Story
            name = document.getElementById("storyName").value;
            email = document.getElementById("storyEmail").value;
            story = document.getElementById("story").value;
        }


        if (optionSelected === "2") { // Classes
            alert("Thank you, " + name + "! We will contact you at " + email + ", about our " + level + " classes on " + day + ".");
        }

        if (optionSelected === "1") { // Careers
            alert("Thank you, " + name + "! We will contact you at " + email + ", if we have any " + availability + " " + role + " openings.");
        }

        if (optionSelected === "3") { // Story
            alert("Thank you, " + name + "! We will contact you at " + email + ", to answer all your questions about " + story + ".");
        }
    }