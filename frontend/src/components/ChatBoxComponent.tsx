import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function ChatBoxComponent() {
  const [messages, setMessages] = useState<any[]>([]);
  const [saveQueryDialogOpen, setSaveQueryDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setMessages([
      {
        content: "Best seller of the month",
        // question: 'What was the best seller of the last month?',
        direction: "in",
      },
      {
        content: "Best seller of the year",
        // question: 'What was the best seller of the last month?',
        direction: "out",
      },
      {
        content: "Top 10 sellers of the month",
        // question: 'What are the top 10 selling products of the last month?',
        direction: "in",
      },
      {
        content: "Top 10 sellers of the year",
        // question: 'What are the top 10 selling products of the last year?',
        direction: "out",
      },
    ]);
  }, []);

  //   const saveQuery = (question: string) => {
  const saveQuery = () => {
    setSaveQueryDialogOpen(true);
  };

  const confirmSaveQuery = (question: string) => {
    setSaveQueryDialogOpen(false);
  };
  //   const submitQuestion = (question: string) => {
  const submitQuestion = () => {
    // console.log(question);
    setMessages([
      ...messages,
      {
        content: "New Question",
        type: "text",
        direction: "out",
      },
    ]);
  };

  return (
    <Box
      padding={1}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      {/*  tslint:disable-next-line  */}
      {/* <Stack spacing={3} xs={{ maxHeight: "90vh", overflowY: "scroll" }}> */}
      <Stack spacing={3}>
        {messages.map((message) => (
          <Box
            sx={{
              display: "flex",
              padding: 1,
              border: 1,
              borderRadius: 2,
              bgcolor: message.direction === "in" ? "info.light" : null,
              borderColor:
                message.direction === "out" ? "grey.300" : "info.light",
              justifyContent: "space-between",
              maxWidth: "90%",
              alignSelf: message.direction === "in" ? "start" : "end",
              flexGrow: 1,
            }}
          >
            <Typography variant="body2">{message.content}</Typography>
            {message.direction === "out" && (
              <IconButton
                aria-label="Save Question"
                size="small"
                onClick={saveQuery}
              >
                <BookmarkIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Stack>
      <TextField
        // label="With normal TextField"
        id="standard-start-adornment"
        sx={{ m: 1 }}
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Submit Question"
                size="small"
                onClick={submitQuestion}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Confirm delete dialog */}
      <Dialog maxWidth="sm" open={saveQueryDialogOpen} onClose={saveQuery}>
        <DialogTitle id="alert-dialog-title">Save Query</DialogTitle>
        <DialogContent>
          <Box sx={{ flexDirection: "column" }}>
            <TextField label="Title" sx={{ m: 1 }} />
            <TextField label="Question" sx={{ m: 1 }} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveQueryDialogOpen(false)}>Cancel</Button>
          <Button onClick={saveQuery} autoFocus variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
