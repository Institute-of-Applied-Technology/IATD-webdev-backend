// Array to store students
let students = [];

function addStudent() {
    // Get student name from input
    const studentName = document.getElementById('student-name').value;

    // Create a new student object
    const newStudent = {
        name: studentName,
        grades: [],
        average: 0
    };

    // Add the student to the students array
    students.push(newStudent);

    // Clear the input
    document.getElementById('student-name').value = '';

    // Update the student select dropdown
    updateStudentSelect();

    // Update the student list display
    displayStudents();
}

function addGrade() {
    // Get selected student and grade from inputs
    const studentSelect = document.getElementById('student-select');
    const selectedStudentIndex = studentSelect.selectedIndex;
    const grade = parseFloat(document.getElementById('grade').value);

    // Add the grade to the selected student's grades array
    students[selectedStudentIndex].grades.push(grade);

    // Clear the input
    document.getElementById('grade').value = '';

    // Update the student list display
    displayStudents();
}

function calculateAverages() {
    // Calculate averages for each student
    students.forEach(student => {
        const total = student.grades.reduce((sum, grade) => sum + grade, 0);
        student.average = total / student.grades.length;
    });

    // Update the student list display
    displayStudents();
}

function updateStudentSelect() {
    // Get the student select element
    const studentSelect = document.getElementById('student-select');

    // Clear the current options
    studentSelect.innerHTML = '';

    // Add an option for each student
    students.forEach((student, index) => {
        const option = document.createElement('option');
        option.textContent = student.name;
        option.value = index;
        studentSelect.appendChild(option);
    });
}

function displayStudents() {
    // Get the student list element
    const studentList = document.getElementById('student-list');

    // Clear the current student list
    studentList.innerHTML = '';

    // Create a list item for each student
    students.forEach(student => {
        const studentItem = document.createElement('div');
        studentItem.className = 'student-item';

        // Create the student name and average text
        const studentText = document.createElement('p');
        studentText.innerHTML = `<strong>${student.name}</strong> - Average: ${student.average.toFixed(2)}`;

        // Create a list of grades
        const gradesList = document.createElement('ul');
        student.grades.forEach(grade => {
            const gradeItem = document.createElement('li');
            gradeItem.textContent = grade;
            gradesList.appendChild(gradeItem);
        });

        // Add the text and grades list to the student item
        studentItem.appendChild(studentText);
        studentItem.appendChild(gradesList);

        // Add the student item to the student list
        studentList.appendChild(studentItem);
    });
}
