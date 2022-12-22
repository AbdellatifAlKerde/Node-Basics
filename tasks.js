/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  // console.log("hello" + text.replace("hello", ""));
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text.trim().startsWith("hello ") || text.trim() === "hello") {
    hello(text.trim() + "!");
  } else if (text === "help\n") {
    help();
  } else if (text === "list\n") {
    list();
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  const word = text.split(" ");

  if (word.length > 1) {
    out = text;
  } else {
    out = text;
  }

  out = out.trim();

  console.log(out);
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

/**
 * get all the the commands
 *
 * @returns {void}
 */
function help() {
  console.log(
    "quit / exit --- to stop the app\nhello --- greetings!\nhello (your name!) --- greetings! (hello name)\nhelp --- list the commands"
  );
}

/**
 * list command
 *
 * @returns {void}
 */
function list() {
  let list = ["HTML", "CSS", "JS"];

  for (let i = 0; i < list.length; i++) {
    console.log(`${i + 1}- ${list[i]}`);
  }
}

// The following line starts the application
startApp("Abdellatif");
