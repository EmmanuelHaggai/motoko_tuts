import Principal "mo:base/Principal";

actor Motoko_Tutorial {
  public shared (msg) func whoami() : async Principal {
    return msg.caller;
  };

  public query func greet(name : Text) : async Text {
    return "Hello, " # name # "!";
  };  


};
