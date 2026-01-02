module.exports.config = {
    name: "leave",
    version: "1.0.0",
    hasPermssion: 2, 
    credits: "🔰𝐑𝐀𝐇𝐀𝐓 𝐈𝐒𝐋𝐀𝐌🔰",
    description: "Make the bot leave the group",
    commandCategory: "System", 
    usages: "leave",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const { threadID } = event;
    api.sendMessage("এই গ্রুপে অনেক বট আছে এরজন্য বের হয়ে যাচ্ছি", threadID, () => {
        api.removeUserFromGroup(api.getCurrentUserID(), threadID);
    });
};
