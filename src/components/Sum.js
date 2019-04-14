import React, { Component } from 'react'

 class Sum extends Component {
 
    sumCourses(){
        const studentWeeklyHours = [];
        const items = this.props.newCourses || [];
        const courseSum = items.map(item => 
        {if(item.courseType == '0'){
            studentWeeklyHours.push(Number(item.courseHours));
            return Number(item.courseGrade) * Number(item.courseHours);
          
        }else{

            const grade =  (Number(item.courseGrade) * 92 ) / Number(item.coursePassGrade);
            studentWeeklyHours.push(Number(item.courseHours));
            return grade * Number(item.courseHours);

            

        }
        
        // this.courseCalc.bind(this, item);
    });
       
        let sum = courseSum.reduce((prev, next) => prev + next, 0);
        const weeklyHoursSum = studentWeeklyHours.reduce((prev, next) => prev + next, 0);
    
        var avg = sum / weeklyHoursSum;
        return(isNaN(avg) ? 'כדי להתחיל בחישוב יש להזין קורס' : ' ממוצע הקורסים הוא ' + Math.round(avg));
        

    }

render() {
    return(
        <div>
            <h3>
                {this.sumCourses()}
            </h3>
        </div>
    )
  }
}

export default Sum;