let green, grey;
let bootupLogoStr = " ___  __                   ________  ________  ________  ________     \n|\\  \\|\\  \\                |\\  ___  \\|\\   __  \\|\\   __  \\|\\   __  \\    \n" + "\\ \\  \\/  /|_  ____________\\ \\____   \\ \\  \\|\\  \\ \\  \\|\\  \\ \\  \\|\\  \\   \n" + " \\ \\   ___  \\|\\____________\\|____|\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\  \n" + "  \\ \\  \\\\ \\  \\|____________|   __\\_\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \\  \\\\\\  \\ \n" + "   \\ \\__\\\\ \\__\\               |\\_______\\ \\_______\\ \\_______\\ \\_______\\ \n" + "    \\|__| \\|__|               \\|_______|\\|_______|\\|_______|\\|_______|\n";
let font;
// Variable to store text currently being typed
let typing = "" ;
// Variable to store saved text when return is hit
let saved = "" ;
let inputY, inputX;
let rectH;
let bootupLogo, bootupInfo;
let textBox;
let preinput = "$localhost> ";
let cmdList = new Array("help", "listfiles", "open");
let helpList = new Array("Opens the help documentation.", "Lists available files.", "Opens file given.");
let files = [];

function setup() {
  createCanvas(200, 200);
  green = color(65, 255, 0);
  grey = color(6, 29, 12);
  //font = createFont("VT323-Regular.ttf", 48);
  textSize(48);
  //bootupLogoStr = "Ready!";
  bootupLogo = new MakeText(bootupLogoStr, width/2, 100, 48);
  let bootupInfoStr = "Booting system...\n" + "K-9000 Core Initialized.\n" + "Version K1.94.0\n" + "A Kane Industries System.\n" + "Type 'help' to list options.\n";
  //bootupInfoStr = "PC";
  bootupInfo = new MakeText(bootupInfoStr, width/2, 100 + 48*10, 48);
  inputY = height/2 + 200;
  inputX = 25;
  rectH = 0;
  textBox = new MakeText(preinput, inputX, inputY, 48);
  fileSetup();
}


function draw() {
  background(grey);
  imageMode(CENTER);
  fill(green);
  //scanline();
  textAlign(CENTER);
  bootup();
  textAlign(LEFT);
  if (bootupInfo.isDone) {
    textBox.typewriter(false);
  }
}

class MakeText {
  constructor(text_, x_, y_, size_) {
    this.counter = 0;
    this.text = text_;
    this.x = x_;
    this.y = y_;
    this.size = size_;
    this.isDone = false;
    //textFont(font, 48);
  }


  typewriter(intro) {
    this.introDone = intro;
    if (this.counter < this.text.length) {
      this.counter++;
    } else {
      this.isDone = true;
    }
    fill(green);
    text(this.text.substring(0, this.counter), this.x, this.y);
    if (!this.introDone) {
      if (this.text.charAt(this.text.substring(0, this.counter).length-1) == '\n') {  
        this.move();
        bootupLogo.move();
        bootupInfo.move();
      }
    }
  }


  move() {
    this.y -= this.size + 10;
    print("move");
  }


  addText(newText) {
    this.newT = newText;
    this.text = this.text + this.newT;
  }


  backspace() {
    this.counter -= 1;
    this.text = this.text.substring(0, max(0, text.length - 1));
  }
}


function bootup() {
  bootupLogo.typewriter(true);
  if (bootupLogo.isDone) {
    bootupInfo.typewriter(true);
  }
}


function keyPressed() {
  // If the return key is pressed, save the let and clear it
  if (key == 'Enter') {
    saved = typing;
    checkCommand(saved);
    textBox.addText("\n" + preinput);
    typing = "" ;
    print("etmer");
    // Otherwise, concatenate the let
  } else if (key == "Backspace") {
    typing = typing.substring(0, max(0, typing.length - 1));
    textBox.backspace();
  } else if ((keyCode > 64 && keyCode < 91) || (keyCode > 96 && keyCode < 123) || keyCode == 8 || (keyCode >= 48 && keyCode <= 57) || keyCode == 32 || keyCode == 190) {
    typing = typing + key;
    textBox.addText(str(key));
  }
} 

class File {
  constructor(name_, body_) {
    this.name = name_;
    this.body = body_;
  }

  openFile() {
    textBox.addText("\n" + this.body);
  }

  addName() {
    textBox.addText("\n" + this.name);
  }
}
function fileSetup() {
  //files = new File[5];
  //files[0] = new File("toLisa.doc", "Love");
  let heart = "<3";
  let body = "";
  body = "Lena Dixon\nDonald Thelin\nLena Thelin-Dixon\nDonald Thelin-Dixon\nLena Dixon-Thelin\nDonald Dixon-Thelin\nDonald and Lena Dilin\nDonald and Lena Thexon\nLast names are dumb anyways.";
  files[0] = new File("futurePlans.txt", body);
  body = "IEX-4Z32\n25m 7y\nRegistered in McAvoy's Records 1979v7.";
  files[1] = new File("IEX-4Z32.txt", body);
  body = "Project Hoenir\nProgress Report\nAutomatic Attractor - Operational\nImplantation - Operational\nCentral Control - Unoperational\nLast update: 01.07.84";
  files[2] = new File("pHoenir.txt", body);
  body = "Dear Mr. Boyd,\nI am writing to you one last time in the hopes that you will aid me in my project.\nI could use the assistance of another orlethology expert in my research.\nPlease do get back to me.\nYour potential colleague,\nDoctor Donald Dixon.";
  files[3] = new File("toBoyd.txt", body);
  body = "\nTo my dearest Lena,\nYour brilliance is only outshined by your beauty. \nThose fools at the Loop had no idea what they did when they forced you out.\nA confederacy of dunces, the lot of them, all against you!\nBut you are destined for a Nobel!\nFor glory! To redefine science for a generation!\nI was devastated by your removal but I had faith.\nAnd you rewarded my faith when you let me join you in Project IEX-4Z32.\nI won't let you down.\nWere you to read this, perhaps we could be together.\nBut I cannot send this to you. Not yet.\nOur work must come first.\nOne day.\nLove, \nDoctor Donald Dixon\n<3";
  files[4] = new File("toLena.txt", heart + body);
}

function checkCommand(input) {
  let inputs = split(input, ' ');
   if (inputs[0]==(cmdList[0])) {
    help();
  } else if (inputs[0] == (cmdList[1])) {
    listFiles();
  } else if (inputs[0] == (cmdList[2])) {
    open(inputs[1]);
  } else {
    textBox.addText("\nError: Command not recognized. Type 'help' for assistance.");
  }
}

function help() {
  for (let i = 0; i < 3; i++) {
    textBox.addText("\n" + cmdList[i] + " - " + helpList[i]);
  }
}

function listFiles() {
  for (let i = 0; i < files.length; i++) {
    files[i].addName();
  }
}
function open(name) {
  let couldOpen = false;
  for (let i = 0; i < files.length; i++) {
    if ((name == files[i].name) && !couldOpen) {
      files[i].openFile();
      couldOpen = true;
    }
  }
  if (!couldOpen) {
    textBox.addText("\nError: File name not recognized.");
  }
}

function scanline() {
  fill(65, 255, 0, 10);
  rectMode(CENTER);
  rect(width/2, rectH, width, 20);
  rectH += 5;
  if (rectH > height) {
    rectH = 0;
  }
}
