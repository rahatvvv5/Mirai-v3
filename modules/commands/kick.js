module.exports.config = {
	name: "kick",
	version: "1.2.0", 
	hasPermssion: 0,
	credits: "🔰𝗥𝗮𝗵𝗮𝘁_𝗜𝘀𝗹𝗮𝗺🔰",
	description: "Remove a tagged person from the group",
	commandCategory: "System", 
	usages: "[tag]", 
	cooldowns: 0,
};

module.exports.languages = {
	"vi": {
		"error": "Đã có lỗi xảy ra, vui lòng thử lại sau",
		"needPermssion": "Cần quyền quản trị viên nhóm\nVui lòng thêm và thử lại!",
		"missingTag": "Bạn phải tag người cần kick"
	},
	"en": {
		"error": "Error! An error occurred. Please try again later!",
		"needPermssion": "Need group admin\nPlease add and try again!",
		"missingTag": "You need to tag someone to kick"
	}
};

module.exports.run = async function({ api, event, getText }) {
	try {
		// 🧠 Step 1: Get group info directly from Facebook API
		let threadInfo = await api.getThreadInfo(event.threadID);

		if (!threadInfo || !threadInfo.adminIDs) {
			return api.sendMessage("⚠️𝗖𝗼𝘂𝗹𝗱 𝗻𝗼𝘁 𝗴𝗲𝘁 𝗴𝗿𝗼𝘂𝗽 𝗮𝗱𝗺𝗶𝗻 𝗹𝗶𝘀𝘁!", event.threadID);
		}

		// 🧠 Step 2: Check if bot is admin
		if (!threadInfo.adminIDs.some(item => item.id == api.getCurrentUserID())) {
			return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
		}

		// 🧠 Step 3: Check mentions
		let mention = Object.keys(event.mentions);
		if (!mention[0]) {
			return api.sendMessage(getText("missingTag"), event.threadID, event.messageID);
		}

		// 🧠 Step 4: Check if sender is admin
		if (!threadInfo.adminIDs.some(item => item.id == event.senderID)) {
			return api.sendMessage("⚠️ 𝗬𝗼𝘂 𝗺𝘂𝘀𝘁 𝗯𝗲 𝗮𝗻 𝗮𝗱𝗺𝗶𝗻 𝘁𝗼 𝘂𝘀𝗲 𝘁𝗵𝗶𝘀 𝗰𝗼𝗺𝗺𝗮𝗻𝗱!", event.threadID, event.messageID);
		}

		// 🧠 Step 5: Kick users
		for (const id of mention) {
			setTimeout(() => {
				api.removeUserFromGroup(id, event.threadID, (err) => {
					if (err) {
						api.sendMessage(`❌𝗙𝗮𝗶𝗹𝗲𝗱 𝘁𝗼 𝗿𝗲𝗺𝗼𝘃𝗲: ${event.mentions[id]}`, event.threadID);
					} else {
						api.sendMessage(`✅𝗥𝗲𝗺𝗼𝘃𝗲𝗱: ${event.mentions[id]}`, event.threadID);
					}
				});
			}, 3000);
		}

	} catch (e) {
		console.error("Kick command error:", e);
		return api.sendMessage(`❌ Error: ${e.message || getText("error")}`, event.threadID);
	}
};
