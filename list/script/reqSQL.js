var request = {
    createTabGroup: "CREATE TABLE IF NOT EXISTS Groups(number, yearIn, yearOut)",//create table Group
    insertGroup: "INSERT INTO Groups (number, yearIn, yearOut) values(?, ?, ?)",
    createTabStudent: "CREATE TABLE IF NOT EXISTS Students(surname, name, secondname, num, yI, yO)",
    insertStudent: "INSERT INTO Students (surname, name, secondname, num, yI, yO) values(?, ?, ?, ?, ?, ?)",
    selectStudentFromGroup: "SELECT*FROM Groups WHERE number LIKE\'?\'",
    selectFromStudForGroup: "SELECT * FROM Students WHERE num LIKE \'group\' AND yI <= year AND yO >= year",
    selectFromStudentBySurname: "SELECT*FROM Students WHERE surname=\'?\'",
    deleteTab: "DROP TABLE Students",
    deleteDataFromTab: "DELETE FROM Students WHERE surname LIKE\'?\'",
    selectBetweenYears: "SELECT * FROM Groups WHERE yearIn <= ? AND yearOut >= ?"
};
