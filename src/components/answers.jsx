import React, { useEffect,useState } from "react";
import { fade, makeStyles, emphasize } from "@material-ui/core/styles";

import * as firebase from "firebase";
import { useHistory, Link } from "react-router-dom";
import { Paper } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    typographyStyle: {
        flex: 0.5,
        textDecoration: "none",
        color: "white",
        padding: "10px",
        border: "1px",
        textAlign: "center",

        "&:hover": {
            backgroundColor: emphasize("#f00", 0.3),
        },
    },
    MainContainer: {
        flexGrow: 1,
        // width: '2900px',
        maxWidth: 1300,
        marginTop: '10px',
        alignItems: 'center',
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        padding: '10px',
        marginTop: "100px"

    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: "none",
        [ theme.breakpoints.up("sm") ]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: "100%",
        [ theme.breakpoints.up("sm") ]: {
            marginLeft: theme.spacing(3),
            width: "auto",
        }, Paper: {
            alignItems: 'center',
            flex: 1,
            justifyContent: "center",
            textAlign: "center",
            padding: '10px',
            marginTop: "100px",
            maxWidth:'1500px'

        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    mainHeaderItems: {},
    inputRoot: {
        color: "inherit",
    },
    logo: {
        width: "100px",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [ theme.breakpoints.up("md") ]: {
            width: "20ch",
        },
    },
    sectionDesktop: {
        display: "none",
        [ theme.breakpoints.up("md") ]: {
            display: "flex",
        },
    },
    sectionMobile: {
        display: "flex",
        [ theme.breakpoints.up("md") ]: {
            display: "none",
        },
    },
    Paper: {
        alignItems: 'center',
        flex: 1,
        justifyContent: "center",
        textAlign: "center",
        padding: '10px',
        width:'280px',
        border: '5px',
        borderRadius:'50px'

    },
}));

export default function PrimarySearchAppBar() {

    const classes = useStyles();
    const history = useHistory();
    const [loading,setLoading] = useState(true)
    const [ data, setData ] = useState([])
    const [ AnswersDataCorrect, setAnswersDataCorrect ] = useState([])
    const [ AnswersDataFalse, setAnswersDataFalse ] = useState([])
    const [CorrectAndFalse,SetCorrectAndFalse] = useState()
    useEffect(() => {
        let link = window.location.href
        let docArray = link.split('answers/')
        let DocId = docArray[1]
        console.log(`Doc ID ${DocId}`)
        let db = firebase.firestore()
        let answersCollection = db.collection('answers').doc(DocId).get().then((query) => {
            let data = query.data()
            // let correctAnsData = data.correctAnswers
            console.log(data)
            setLoading(false)
            setData(data)
            setAnswersDataCorrect(data.correctAnswers)
            setAnswersDataFalse(data.falseAnswers)
        })
     
        
    }, [])
    
    useEffect(() => {
        SetCorrectAndFalse(AnswersDataCorrect.length + AnswersDataFalse.length)

    },[AnswersDataFalse,AnswersDataCorrect])
  
    const renderFalseQuestions = (
        <div className={classes.Paper}>
            <h1>Your wrong answers</h1>
            <Grid container spacing={5} >

       { AnswersDataFalse.map((answer) => {


           return (
                <Grid item xs={4}>
                   <Box boxShadow={3}>

                <Paper>

                        <h2>Question number: {answer.questionNumber + 1}</h2>
                        <h3>CorrectAsnwer: {answer.correctAnswer}</h3>
                        <h3>user answer: {answer.userAnswer}</h3>
                       </Paper>
                      </Box>

                   </Grid>
            )
       })}
                </Grid>
            </div>
)

    const renderAllQuestionsRight = (
        <h1>UwU You've got the whole questions!!</h1>
    )
    if (!data) return <h1>Still loading</h1>
    return (
        <Container className={classes.MainContainer} >
            <h2>Your score is :</h2>
            <h1>{AnswersDataCorrect.length}/{CorrectAndFalse}!!</h1>
            <Grid container spacing={5} >

            {AnswersDataFalse.length !== 0 ? renderFalseQuestions : renderAllQuestionsRight}
        </Grid>
</Container>
    );
}
