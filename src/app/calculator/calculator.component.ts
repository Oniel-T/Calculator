import { Component, Input, OnInit } from '@angular/core';
import { environment } from './../../environments/environment.prod';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  title = 'Calculator';
  result:string='';
  resultCal:string = ''; 
  constructor() { }

  ngOnInit(): void {
  }


  onSelectHistory(str:string){
    this.resultCal = str;
    this.result = str;
  }
  
  AddNumber(numb:number){
    var splitOper = (this.resultCal != '')?this.resultCal.trim().split(' '):null;
    var noSpace = splitOper != null && splitOper.length >0 ? isNaN(Number(splitOper[splitOper.length - 1])): false;

    this.result+=numb;
    if(this.resultCal == '' || !noSpace)
      this.resultCal += numb;
     else
      this.resultCal+=' '+numb;
  }
  AddOperator(op:string){
    if(this.result.length > 0)
    {
     this.result+=op;
     if(this.resultCal == '')
      this.resultCal += op;
     else
      this.resultCal+=' '+op;
    }
  }
  AddParam(op:string){

    if(op == '('){

    }
  }
  Remove(deleteAll:boolean){
    if(deleteAll){
      this.result = '';
      this.resultCal = '';
    }
    else
    {
      this.result = this.result.substr(0,this.result.length - 1);
      this.resultCal = this.resultCal.substr(0,this.resultCal.length - 1);
    }
  }
  CalculateValue(){
    let queryArr = this.resultCal.split(' ');
    
    var maxTryAllowed = 1;
    var tryCount=0;
    while(queryArr.length>1 && tryCount<maxTryAllowed)
    {
	var precedScaleArr = this.getPrecedenceScale(queryArr)
    var precedScaleArrSort = precedScaleArr.slice();
    precedScaleArrSort = precedScaleArrSort.sort(function(a, b) {
  		return b - a;
	});
    
    for(var i=0;i<precedScaleArrSort.length;i++)
    {
		var precedenceVal=0;
    	var preci = 0;
    	for(var j=0;j<queryArr.length;j++)
    	{
        	if(queryArr[j]=='('){
				preci = preci + 5;
            	precedenceVal = preci;
			}else if(queryArr[j]==')'){
            	precedenceVal = preci;
				preci = preci - 5;
			}
    		else if(isNaN(Number(queryArr[j])))
        	{
            	precedenceVal = this.getPrecedenceValue(queryArr[j]) + preci;
			}
            if(precedenceVal == precedScaleArrSort[i] && isNaN(Number(queryArr[j])))
            {
            debugger
				switch(queryArr[j])
                {
					case '+':
                    if(j>1 && queryArr[j-2] == '-')
                    {
                    	
                        if((-parseFloat(queryArr[j-1]) + parseFloat(queryArr[j+1])) > 0)
                        {
                        	queryArr[j-1] = Math.abs(-parseFloat(queryArr[j-1]) + parseFloat(queryArr[j+1])).toString();
                        	queryArr[j-2] = "+";
                            precedScaleArrSort[precedScaleArrSort.indexOf(precedenceVal-1)]=precedenceVal; //replaces precedence value of - with +
                        }
                        else
                        {
                        	queryArr[j-1] = Math.abs(-parseFloat(queryArr[j-1]) + parseFloat(queryArr[j+1])).toString();
                    		queryArr[j-2] = "-";
                        }
                    }
                    else    
                    	queryArr[j-1] = (parseFloat(queryArr[j-1]) + parseFloat(queryArr[j+1])).toString();
                    break;
                    case '-':
                    if(j>1 && queryArr[j-2] == '-')
                    {
                    	queryArr[j-1] = Math.abs(-parseFloat(queryArr[j-1]) - parseFloat(queryArr[j+1])).toString();
                        queryArr[j-2] = (parseFloat(queryArr[j-1]) > 0) ? "+":"-";
                    }
                    else    
                    	queryArr[j-1] = (parseFloat(queryArr[j-1]) - parseFloat(queryArr[j+1])).toString();
                    break;
                    case '*':
                    queryArr[j-1] = (parseFloat(queryArr[j-1]) * parseFloat(queryArr[j+1])).toString();
                    break;
                    case '/':
                    queryArr[j-1] = (parseFloat(queryArr[j-1]) / parseFloat(queryArr[j+1])).toString();
                    break;
				}
                if(j < queryArr.length)
                {
                	queryArr.splice(j,1);
                }
                if(j < queryArr.length)    
                {
                	queryArr.splice(j,1);
                }
                if(j>1 && queryArr[j-2] == '(' && j < queryArr.length && queryArr[j] == ')')   // remove unwanted brackets
                {
					queryArr.splice(j - 2,1);
                	queryArr.splice(j - 1,1);
                    j--;
                    j--;
                    preci = preci - 5;
				}
			}
    	}
    }
    tryCount++;
    }
    this.result = JSON.stringify(Number(queryArr[0]));
    this.resultCal = JSON.stringify(Number(queryArr[0]));
  }

  private getPrecedenceScale(queryArray: string[]){
    var precedence = [];
    var preci = 0;
      for(var i=0;i<queryArray.length;i++)
        {
          if(queryArray[i]=='('){
          preci = preci + 5;
                precedence.push(preci);
        }else if(queryArray[i]==')'){
                precedence.push(preci);
          preci = preci - 5;
        }
          else if(isNaN(Number(queryArray[i])))
          {
          precedence.push(this.getPrecedenceValue(queryArray[i]) + preci)
        }
        }
        return precedence;
    }
    private getPrecedenceValue(symbol){
      switch (symbol){
      case "-":
      return 1;
      break;
      case "+":
      return 2;
      break;
      case "*":
      case "x":
      return 3;
      break;
      case "/":
      return 4;
      break;
      }
      return 1;
      }

  
  // private PrecidenceArray(array:string[]){
  //   var OperationArray=[];
  //   let bracketPrecidence = 4;
  //   for(let i=1;i<=array.length;i=i+2)
  //   {
  //     switch(array[i])
  //       {
  //         case '-':
  //           OperationArray.push('1')
  //         break;
  //         case '+':
  //           OperationArray.push('2')
  //         break;
  //         case '*':
  //           OperationArray.push('3')
  //         break;
  //         case '/':
  //           OperationArray.push('4')
  //         break;
  //         case '(':
  //           bracketPrecidence++;
  //           OperationArray.push('5')
  //         break;
  //       }
  //   }
  // }
}
