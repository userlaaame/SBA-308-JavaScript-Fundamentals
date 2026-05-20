// Your goal is to analyze and transform this data such that the output of your program is an 
// array of objects, each containing the following information in the following format:

// {
//     // the ID of the learner for which this data has been collected
//     "id": number,
//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more
//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//     "avg": number,
//     // each assignment should have a key with its ID,
//     // and the value associated with it should be the percentage that
//     // the learner scored on the assignment (submission.score / points_possible)
//     <assignment_id>: number,
//     // if an assignment is not yet due, it should not be included in either
//     // the average or the keyed dictionary of scores
// }

/* If an AssignmentGroup does not belong to its course (mismatching course_id), your program 
should throw an error, letting the user know that the input was invalid. Similar data validation
should occur elsewhere within the program.

You should also account for potential errors in the data that your program receives. 
What if points_possible is 0? You cannot divide by zero. What if a value that you are expecting
to be a number is instead a string? 

Use try/catch and other logic to handle these types of errors gracefully.
If an assignment is not yet due, do not include it in the results or the average. Additionally,
if the learner’s submission is late (submitted_at is past due_at), deduct 10 percent of the total
points possible from their score for that assignment.

Create a function named getLearnerData() that accepts these values as parameters, in the order 
listed: (CourseInfo, AssignmentGroup, [LearnerSubmission]), and returns the formatted result, 
which should be an array of objects as described above.
You may use as many helper functions as you see fit. */


// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript"
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500
    }
  ]
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47
    }
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150
    }
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400
    }
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39
    }
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140
    }
  }
];

// function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.

  //Figure out how many learner there are (and how many report objects are needed)


  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0 // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833 // late: (140 - 15) / 150
    }
  ];

  return result;
// }

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

//===============INITIAL PHASE=======================//
//So we're basically compressing all 3 objects, analyzing them, and coming up with a report object for each learner.
// /* If an AssignmentGroup does not belong to its course (mismatching course_id), your program 
// should throw an error, letting the user know that the input was invalid. Similar data validation
// should occur elsewhere within the program.

//Foundation: Let's figure out how many objects need to be in a result array based 
// the amount of off of Learner arrays.


//Step 1: Validate the input data
function getLearnerData(course, ag, submissions) {
  if (ag.course_id !== course.id) {
    throw new Error(`AssignmentGroup ${ag.id} does not belong to course ${course.id}`);
  }

  //Step 2: Filter to only assignments that are due
  const today = new Date();
  const dueAssignments = ag.assignments.filter(a => new Date(a.due_at) <= today);

//     the ID of the learner for which this data has been collected
//     "id": number,
  //Step 3: Group submissions by learner_id
  const learners = {};
  for (const sub of submissions) {
    if (!learners[sub.learner_id]) {
      learners[sub.learner_id] = [];
    }
    learners[sub.learner_id].push(sub);
  }
}




//     // the learner’s total, weighted average, in which assignments
//     // with more points_possible should be counted for more


//     // e.g. a learner with 50/100 on one assignment and 190/200 on another
//     // would have a weighted average score of 240/300 = 80%.
//===============For weighted Average score (Thanks Quinn)=================