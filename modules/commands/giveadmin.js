module.exports.config = {
    name: "giveadmin",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "🔰𝐑𝐀𝐇𝐀𝐓 𝐈𝐒𝐋𝐀𝐌🔰",
    description: "Make the sender an admin of the group",
    commandCategory: "group",
    usages: "",
    cooldowns: 5
};

module.exports.run = async function ({ api, event }) {

    const threadID = event.threadID;
    const senderID = event.senderID;

    try {
        // Change admin status: true = give admin
        api.changeAdminStatus(threadID, senderID, true, (err) => {
            if (err) {
                return api.sendMessage("❌এই গ্রুপে আমি এডমিন নাই এরজন্য হচ্ছে না😓", threadID);
            }
            api.sendMessage("✅ You are now an admin of this group!", threadID);
        });

    } catch (error) {
        api.sendMessage("❌ An error occurred while trying to give admin.", threadID);
    }
};
