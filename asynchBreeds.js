// asyncBreeds.js
const fs = require('fs');

const breedDetailsFromFile = function(breed, callback) { // Added a callback function (breed, callback)
  console.log('breedDetailsFromFile: Calling readFile...');
  fs.readFile(`./data/${breed}.txt`, 'utf8', (error, data) => {
    console.log("In readFile's Callback: it has the data.");
    // ISSUE: Returning from *inner* callback function, not breedDetailsFromFile.
    if (!error) callback(data);
  });
  // ISSUE: Attempting to return data out here will also not work.
  //        Currently not returning anything from here, so breedDetailsFromFile function returns undefined.
};

// we try to get the return value
const bombay = breedDetailsFromFile('Bombay');
console.log('Return Value: ', bombay); // => will NOT print out details, instead we will see undefined!

// The Return Value console output above will not display the file data because our breedDetailsFromFile 
// function will always return undefined.

/*
1: const bombay > 2: breedDetailsFromFile (Bombay.txt) 
3: RETURNS undefined IMMEDIATLEY (SINCE ITS ASYNC: It takes in a callback and returns immediatley, Not waiting on required code)
4. After readFile returns undefined, breedDetailsFromFile has no other code to exectute thereafter and also returns undefined
5. readFile still has work to do, It reads from disk
6. Executes callback later
7. HOWEVER, the breeDetailsFromFile function already finished running and returned undefined before it gets the data
8. return data line within readFile's vallback is only returning from callback function 
NOT from breedDetailsFromFile!

)
In this implementation, we read the details from disk ("file system") using fs.readFile2. Since readFile is an asynchronous function, it takes in a callback and returns undefined immediately3. After readFile returns undefined, breedDetailsFromFile has no other code to execute thereafter and also returns undefined4.

Meanwhile, readFile still has work to do. It reads from disk5 and executes its callback later7. However, recall that our breedDetailsFromFile function has already finished running and returned undefined before it gets the data4!

It's important to identify that the return data line within readFile's callback is only returning from the callback function8, not from breedDetailsFromFile!

The console log statements in our code also help reveal the control flow:

> node asyncBreeds.js
breedDetailsFromFile: Calling readFile...
Return Value: undefined
In readFile's Callback: it has the data.