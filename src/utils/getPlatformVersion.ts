function getPlatformVersion(driver: any): string | null {
	const allCapabilities: any = driver.capabilities;
	if ("browserVersion" in allCapabilities) {
		return allCapabilities["browserVersion"]
	} else if ("platformVersion" in allCapabilities) {
		return allCapabilities["platformVersion"]
	} else {
		return null;
	}

}

export default getPlatformVersion;