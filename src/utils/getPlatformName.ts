function getPlatformName(driver: any): string | null {
	const allCapabilities: any = driver.capabilities;
	if ("browserName" in allCapabilities) {
		return allCapabilities["browserName"]
	} else if ("platformName" in allCapabilities.desired) {
		let mobilePlatformName = allCapabilities.desired["platformName"].toLowerCase();
		if (mobilePlatformName.includes('ios')) {
			return "iOS"
		} else {
			return allCapabilities.desired["platformName"]
		}
	} else {
		return null;
	}
}

export default getPlatformName;