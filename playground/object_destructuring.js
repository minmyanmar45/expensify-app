console.log("app is running");

const person = {
  //name: undefined,
  age: 27,
  location: {
    city: "New York",
    temp: 31,
  },
};

const { name: username = "Anonymous", age } = person;
const { city, temp: temperature } = person.location;
//const name = person.name;
//const age = person.age;

console.log(`${username} is ${age}`);
console.log(`it is ${temperature} in ${city}`);
