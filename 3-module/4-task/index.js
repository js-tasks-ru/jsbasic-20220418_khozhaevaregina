function showSalary(users, age) {
  let result = [];

  for (let i = 0; i < users.length; i++) {
    if (users[i].age <= age) {
      result.push(`${users[i].name}, ${users[i].balance}`);
    }
  }

  return result.join('\n');
}
