const Alidns20150109 = require("@alicloud/alidns20150109").default
const { AddDomainRecordRequest, DescribeDomainRecordsRequest, UpdateDomainRecordRequest } = require("@alicloud/alidns20150109")
const { Config } = require("@alicloud/openapi-client")
const { RuntimeOptions } = require('@alicloud/tea-util')
const { domainName, RR = 'nas', type = 'A', accessKeyId, accessKeySecret } = require("../config")

class DDNS {
    constructor() {
        this.client = this.init()
    }

    init() {
        const config = new Config({
            accessKeyId,
            accessKeySecret,
        });

        return new Alidns20150109(config);
    }

    async add(ip) {
        const addDomainRecordRequest = new AddDomainRecordRequest({
            domainName,
            RR,
            type,
            value: ip
        });
        const runtime = new RuntimeOptions({});
        return this.client.addDomainRecordWithOptions(addDomainRecordRequest, runtime)
    }

    async edit(ip, recordId) {
        const updateDomainRecordRequest = new UpdateDomainRecordRequest({
            recordId,
            domainName,
            RR,
            type,
            value: ip
        });
        const runtime = new RuntimeOptions({});
        return this.client.updateDomainRecordWithOptions(updateDomainRecordRequest, runtime);
    }

    search() {
        const describeDomainRecordsRequest = new DescribeDomainRecordsRequest({ domainName, RRKeyWord: RR });
        const runtime = new RuntimeOptions({});
        return this.client.describeDomainRecordsWithOptions(describeDomainRecordsRequest, runtime);
    }
}

const main = async (ip) => {
    const ddns = new DDNS()
    const res = await ddns.search()
    const recordId = res.body.domainRecords?.record.find(v => v.RR === RR)?.recordId

    const onCatch = err => {
        if (['DomainRecordDuplicate'].includes(err.code)) return err
        return Promise.reject(err)
    }

    if (recordId) {
        return ddns.edit(ip, recordId).catch(onCatch)
    } else {
        return ddns.add(ip).catch(onCatch)
    }
}

module.exports = main