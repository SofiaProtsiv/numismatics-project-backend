const TelegramBot = require("node-telegram-bot-api");

const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const { BOT_TOKEN, USER_CHAT_ID } = process.env;

const bot = new TelegramBot(BOT_TOKEN, { polling: false });

const addNewApplication = async (req, res) => {
  try {
    const { name, phone, service, question } = req.body;

    const message = `<strong>Нова заявка:</strong>\n<strong>Ім'я</strong>: ${name},\n<strong>Телефон</strong>: ${phone},\n<strong>Послуга</strong>: ${service},\n${question ? `<strong>Коментар</strong>: ${question}` : ""
      }`;

    await bot.sendMessage(USER_CHAT_ID, message, {
      parse_mode: "HTML",
    });

    res.status(201).json({ message: "Data sent successfully" });
  } catch (error) {
    throw HttpError(error.response.statusCode, error.response.statusMessage);
  }
};

module.exports = {
  addNewApplication: ctrlWrapper(addNewApplication),
};
