// import db schema

//initialize a db
/** @type {Array<Object>} */
const employeeData = [];

/**
 * Employee model
 * @typedef {Object} EmployeeModel
 * @property {string} name - name of the employee.
 * @property {Array<string>} skills - what are the technical skills
 * @property {number} phone -phone number of the employee
 * @property {number} id - id of the employee.
 */

/**
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Object}
 */
export const createEmployee = async (req, res, next) => {
  /**
   * @type {EmployeeModel}
   */
  const { name, skills, phone, id } = req.body;

  // validation if any of the value is missing
  if (!name || skills.length == 0 || !phone) {
    let missingFileds = [];
    if (!name) missingFileds.push("name");
    if (skills.length == 0)
      missingFileds.push("atleast one skill should be present");
    if (!phone) missingFileds.push("phone");

    return res.json({
      status: 400,
      message: `Something went wrong. Field ${missingFileds.join(
        ", "
      )} is missing.`,
    });
  }

  // create employee data
  const employee = {
    name,
    skills,
    phone,
    id: Math.floor(Math.random() * 50),
  };

  // push employee data to the db
  employeeData.push(employee);

  //return the response

  return res.json({
    status: 201,
    message: "employee created",
    data: employee,
  });
};

export const getEmpById = (req, res, next) => {
  // get the id of the requested resoource
  const empId = req.params.id;
  // find the user from db
  const emp = employeeData.find((item) => item.id == parseInt(empId));

  // if employee not found
  if (!emp) {
    return res.json({
      status: 400,
      message: "employee not found",
    });
  }

  // return the found object
  return res.json({
    status: 200,
    message: "employee found",
    data: emp,
  });
};

export const updateEmployee = (req, res, next) => {
  /** @type {number} empId - employee id */
  const empId = req.params.id;

  /** @type {EmployeeModel*/
  const { name, skills, phone, id } = req.body;
  //find the employeeIndex
  const employeeIndex = employeeData.findIndex(
    (item) => item.id === parseInt(empId)
  );
  // if employee is not found
  if (employeeIndex == -1) {
    return res.json({
      status: 400,
      message: "employee not found",
    });
  }
  // update the emplyee with new values.
  /**@type {EmployeeModel} */
  const employee = employeeData[employeeIndex];
  employee.name = name;
  employee.skills = skills;
  employee.phone = phone;
  employee.id = id;

  return res.json({
    status: 200,
    message: "employee details updated",
    data: employee,
  });
};

export const getAllEmployee = (req, res, next) => {
  res.json({
    message: "Fetch employees succesfully",
    status: 200,
    data: employeeData,
  });
};
