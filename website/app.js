/* Global Variables */
let baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&appid=758de8070e5318e4c5ae4aa40797b3f0";
const zipCode = document.getElementById ( 'zip' ).value;
const feelings = document.getElementById ( 'feelings' ).value;

let d = new Date ();
let newDate = d.getMonth () + '.' + d.getDate () + '.' + d.getFullYear ();


document.querySelector ( '#generate' ).addEventListener ( 'click' , function ( event ) {
    getData ( baseUrl , zipCode.value , apiKey )
        .then ( function ( data ) {
            postData ( '/data' , {date : newDate , Temperature : data.main.temp , userResponse : feelings} );
        } )
        .then ( function () {
            updateUI ()
        } )
} );
// async get data

const getData = async ( baseUrl , zipcode , apiKey ) => {
    const request = await fetch ( baseUrl + zipcode + apiKey );
    try {
        const data = await request.json ();
        return data;
    } catch (error) {
        console.log ( "error " , error );
    }
};
// async post data

const postData = async ( url = '' , data = {} ) => {
    const response = await fetch ( url , {
        method : 'POST' ,
        credentials : 'same-origin' ,
        headers : {
            'Content-Type' : 'application/json' ,
        } ,
        body : JSON.stringify ( data )
    } );
    try {
        const newWeatherDate = await response.json ();
        console.log ( newWeatherDate );
        return newWeatherDate;
    } catch (error) {
        console.log ( "error in post data" , error );
    }
};


const updateInterface = async () => {
    const request = await getDate ( '/all' );
    try {
        const WeatherData = await request.json ();
        document.getElementById ( 'date' ).innerHTML = WeatherData.Date;
        document.getElementById ( 'temp' ).innerHTML = WeatherData.temp;
        document.getElementById ( 'content' ).innerHTML = WeatherData.userResponse;
    } catch (error) {
        console.log ( "error" , error );
    }
};

