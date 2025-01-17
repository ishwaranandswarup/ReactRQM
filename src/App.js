import React, {Component} from 'react';
import {random} from 'lodash';
import 'typeface-roboto';  
import QuoteMachine from './component/QuoteMachine';
import {Grid} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles'; 


const styles={
  container:{
   
    display: 'flex',
    height: '100vh',
    alignItems: 'center',
  
  }
}
class App extends Component{
  constructor(props){
    super(props);
    this.state={
      quotes:[],
      selectedQuoteIndex: null,
      bgColor : ["#0652DD","#fff200","#16a085","#27ae60","#2c3e50","#f39c12","#e74c3c","#9b59b6","#FB6964","#342224","#472E32","#BDBB99", "#77B1A9","#73A857","#1B1464"],
      selectedColor:'',
    }
    this.selectQuoteIndex=this.selectQuoteIndex.bind(this);
    this.assignNewQuoteIndex=this.assignNewQuoteIndex.bind(this);
    this.getRandomColor=this.getRandomColor.bind(this);
    this.newColor=this.newColor.bind(this);
    }
  componentDidMount(){


    fetch('https://gist.githubusercontent.com/natebass/b0a548425a73bdf8ea5c618149fe1fce/raw/f4231cd5961f026264bb6bb3a6c41671b044f1f4/quotes.json').then(data=>data.json()).then(quotes=>this.setState({quotes},this.assignNewQuoteIndex))
    this.getRandomColor();
 
  }
 
  getRandomColor(){
    var item = this.state.bgColor[Math.floor(Math.random()*this.state.bgColor.length)];
    this.setState({
      selectedColor: item,
    })
  }
  get selectedQuote(){
    if(!this.state.quotes.length || !Number.isInteger(this.state.selectedQuoteIndex)){
      return undefined;
    }
    return this.state.quotes[this.state.selectedQuoteIndex];
  }
 selectQuoteIndex(){
   if(!this.state.quotes.length){
     return undefined;
   }
  return random(0,this.state.quotes.length-1)
 }
 assignNewQuoteIndex(){
  this.setState({selectedQuoteIndex: this.selectQuoteIndex()});
 }
newColor(){
  return this.state.selectedColor;
}
  render(){
   
    console.log(this.state.selectedQuoteIndex);
    return(

    <Grid className={this.props.classes.container} id="quote-box" justify="center" container style={{backgroundColor: this.state.selectedColor}}>
        <Grid xs={11} lg={5} item>
          {
          this.selectedQuote?<QuoteMachine selectedQuote={this.selectedQuote} assignNewQuoteIndex={this.assignNewQuoteIndex}  getRandomColor={this.getRandomColor} newColor={this.newColor}/>: null
          }
        </Grid>
      </Grid>
     
    );
  }
}

export default withStyles(styles)(App);

