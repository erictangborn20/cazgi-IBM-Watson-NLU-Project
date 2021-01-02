import React from 'react';
import './bootstrap.min.css';

class EmotionTable extends React.Component {
    render() {
     let oEmotion = this.props.emotions.result?.entities[0]?.emotion;
     if(oEmotion != null)
     {
      return (
        <div>
          {/*You can remove this line and the line below. */}
          {/*JSON.stringify(this.props.emotions)*/}

          <table className="table table-bordered">
            <tbody>
            {
                //Write code to use the .map method that you worked on in the Hands-on React lab to extract the emotions

	        Object.entries(oEmotion).map(function([key, value]){
	            return <tr><td>{key}</td><td>{value}</td></tr>;
	          })
            }
            </tbody>
          </table>
          </div>
          );
        }

       else
       {
		       return  <div></div>
       }
     }
}
export default EmotionTable;
