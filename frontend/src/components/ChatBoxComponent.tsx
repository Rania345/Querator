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
import LinearProgress from "@mui/material/LinearProgress";
import { DataGrid } from "@mui/x-data-grid";

export default function ChatBoxComponent() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<String>("");
  const [saveQueryDialogOpen, setSaveQueryDialogOpen] =
    useState<boolean>(false);

  useEffect(() => {
    setMessages([
      {
        content: "Hello! How can I assist you today?",
        direction: "in",
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

  const submitQuestion = () => {
    // const submitQuestion = () => {
    if (!inputValue) {
      return;
    }
    const currentMessages = [...messages];
    currentMessages.push(
      {
        content: inputValue,
        type: "text",
        direction: "out",
      },
      {
        content: "",
        type: "loading",
        direction: "in",
      }
    );
    setMessages([...currentMessages]);

    fetch("http://localhost:8000/api/answer_question/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: inputValue,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        currentMessages[currentMessages.length - 1] = {
          content: data,
          type: "table",
          direction: "in",
        };
        setMessages([...currentMessages]);
      })
      .catch(() => {
        currentMessages.pop();
        setMessages([...currentMessages]);
      });
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
              bgcolor: message.direction === "out" ? "info.light" : null,
              borderColor:
                message.direction === "out" ? "info.light" : "grey.300",
              justifyContent: "space-between",
              maxWidth: "90%",
              alignSelf: message.direction === "in" ? "start" : "end",
              flexGrow: 1,
            }}
          >
            {(() => {
              switch (message.type) {
                case "table":
                  return (
                    <DataGrid
                      rows={message.content}
                      columns={Object.keys(message.content[0]).map((field) => ({
                        field,
                      }))}
                    />
                  );
                case "loading":
                  return <LinearProgress variant="indeterminate" />;
                default:
                  return (
                    <Typography variant="body2" color="text.secondary">
                      {message.content}
                    </Typography>
                  );
              }
            })()}
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
        id="standard-start-adornment"
        sx={{ m: 1 }}
        size="small"
        value={inputValue}
        onChange={(evt) => setInputValue(evt.target.value)}
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
            <TextField fullWidth={true} label="Title" sx={{ m: 1 }} />
            <TextField
              fullWidth={true}
              label="Question"
              sx={{ m: 1 }}
              multiline
            />
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
