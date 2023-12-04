const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
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
  
  function getLearnerData(course, assignmentGroup, submissions) {
    // Validate AssignmentGroup and CourseInfo
    if (assignmentGroup.course_id !== course.id) {
      throw new Error("Invalid input: AssignmentGroup does not belong to the course.");
    }
  
    // function to calculate weighted average
    function calculateWeightedAverage(totalScore, totalPossible) {
      return totalPossible === 0 ? 0 : (totalScore / totalPossible) * 100;
    }
  
    // function to handle late submissions and calculate adjusted score
    function calculateLatePenalty(submittedAt, dueAt, score, pointsPossible) {
      if (new Date(submittedAt) > new Date(dueAt)) {
        const penalty = Math.min(score, pointsPossible) * 0.1;
        return score - penalty;
      }
      return score;
    }
  
    // Initialize result array
    const result = [];
  
    // Process submissions
    for (const submission of submissions) {
      // create learner data in result array
      
      let learnerData = result.find(data => data.id === submission.learner_id);
  
      if (!learnerData) {
        learnerData = {
          id: submission.learner_id,
          avg: 0,
        };
        result.push(learnerData);
      }

  
      // Find the corresponding assignment in the AssignmentGroup
      const assignment = assignmentGroup.assignments.find(assign => assign.id === submission.assignment_id);
  
      // Validate assignment and calculate adjusted score
      if (assignment && assignment.course_id === course.id) {
        const lateScore = calculateLatePenalty(
          submission.submission.submitted_at,
          assignment.due_at,
          submission.submission.score,
          assignment.points_possible
        );
  
        // Update learnerData properties
        learnerData[submission.assignment_id] = (lateScore / assignment.points_possible) * 100;
        learnerData.avg += (lateScore / assignment.points_possible) * (assignment.group_weight / 100);
      // } else {
        // throw new Error("Invalid input: Assignment does not belong to the course.");
      }
    }
  
    // Calculate final averages
    for (const learnerData of result) {
      learnerData.avg = calculateWeightedAverage(learnerData.avg, assignmentGroup.group_weight);
    }
  
    return result;
  }
  
  
  const updatedResult = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
console.log(updatedResult);

  // to search a student
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
  
  const desiredStudentID = 132;
  function printLearnerData(learnerData) {
    console.log("Learner Data:");
    for (const learner of learnerData) {
      const outputObject = {
        id: learner.id,
        avg: learner.avg.toFixed(2),
      };
  
      console.log(outputObject);
  
      // console.log("Assignment Scores:");

      // for (const assignmentId in learner) {
      //   if (assignmentId !== "id" && assignmentId !== "avg") {
      //     const assignmentScore = learner[assignmentId].toFixed(2);
      //     const assignmentObject = {
      //       [`Assignment ${assignmentId}`]: `${assignmentScore}%`,
      //     };
      //     console.log(assignmentObject);
        // }
      // }
      console.log("------------");
    }
  }
  
  
  
  // Example usage with updated data
  printLearnerData(updatedResult);
  

  // Find the student in the 'result' array
  const desiredStudent = result.find(student => student.id === desiredStudentID);
  
  // Check if the student is found
  if (desiredStudent) {
      console.log("Student found:", desiredStudent);
  } else {
      console.log("Student not found");
  }
  
//   Your goal is to analyze and transform this data such that the output of your program is an array of objects, 
// each containing the following information in the following format:
// {
    // the ID of the learner for which this data has been collected
    // "id": number,
    // the learner’s total, weighted average, in which assignments
    // with more points_possible should be counted for more
    // e.g. a learner with 50/100 on one assignment and 190/200 on another
    // would have a weighted average score of 240/300 = 80%.
    // "avg": number,
    // each assignment should have a key with its ID,
    // and the value associated with it should be the percentage that
    // the learner scored on the assignment (submission.score / points_possible)
    // <assignment_id>: number,
    // if an assignment is not yet due, it should not be included in either
    // the average or the keyed dictionary of scores
// }
