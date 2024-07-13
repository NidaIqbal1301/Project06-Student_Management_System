import inquirer from "inquirer";

// Define the Student Class
class Student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Intialize an empty array for courses
        this.balance = 100;
    }

    // Method to enroll a Student in a course
    enroll_course(course: string){
        this.courses.push(course);
    }

    // Method to view a Student Balance
    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    // Method to Pay Student Fee
    pay_fee(amount: number){
        this.balance -= amount;
        console.log(`$${amount} Fees Paid Successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }

    // Method to Display Student Status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${this.balance}`);
    }
}

// Defining a Student_Manager class to manage student
class Student_manager {
    students: Student[]

    constructor(){
        this.students = [];
    }

    // Method to Add a New Students
    add_student(name: string){
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} Added Succeccfully. Student ID: ${student.id}`);
    }

    // Method to Enroll a Student in a Courses
    enroll_student(student_id: number, course: string){
        let student = this.find_student(student_id);
        if (student){
            student.enroll_course(course);
            console.log(`Student: ${student.name} Enrolled in Course: ${course} Successfully`); // my one
        }
    }

    // Method to view a Student Balance
    view_Student_balance(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.view_balance();
        }
        else{
            console.log("Student Not Found. Please Enter a Correct Student ID");
        }
    }

    // Method to Pay Student Fee
    pay_student_fees(student_id: number, amount: number){
        let student = this.find_student(student_id);
        if (student){
            student.pay_fee(amount);
        }
        else{
            console.log("Student Not Found. Please Enter a Correct Student ID");
        }
    }

    // Method to Display student status
    show_student_status(student_id: number){
        let student = this.find_student(student_id);
        if (student){
            student.show_status();
        }
    }

    // Method to find a Student by student_id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);
    }
}

//Main Function to Run the Program

async function main(){
    console.log("Welcome To Student Management System");
    console.log("-".repeat(50));

    let student_manager = new Student_manager();

    // While loop to keep Program Running
    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an Option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);

        // Using Switch Case to handle user Choice
        
        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
            ]);
            student_manager.add_student(name_input.name);
            break;

            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;

            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.view_Student_balance(balance_input.student_id);
                break;

            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the Amount to Pay",
                    }
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;

            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID",
                    }
                ]);
                student_manager.show_student_status(status_input.student_id);
                break;

            case "Exit":
                console.log("Exiting...");
                process.exit();
        }
    }
}

// Calling a Main Function
main();