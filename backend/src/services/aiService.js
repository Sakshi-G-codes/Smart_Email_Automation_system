const generateReply = async (subject, content) => {
  // Simulated AI logic

  let reply = `Hi,\n\n`;

  if (content.toLowerCase().includes("meeting")) {
    reply += `Thank you for your email regarding the meeting. I am available and happy to schedule it. Please confirm a convenient time.\n\n`;
  } else if (content.toLowerCase().includes("otp")) {
    reply += `Thank you for the information. I have received the OTP and will proceed accordingly.\n\n`;
  } else if (content.toLowerCase().includes("issue") || content.toLowerCase().includes("problem")) {
    reply += `We apologize for the inconvenience. We are looking into the issue and will resolve it as soon as possible.\n\n`;
  } else {
    reply += `Thank you for your email regarding "${subject}". We have received your message and will get back to you shortly.\n\n`;
  }

  reply += `Best regards,\nSmart Email Assistant`;

  return reply;
};

module.exports = { generateReply };
