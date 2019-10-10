import { UserTaskRect } from './shape/user.task.rect';
import { StartEventCircle } from './shape/start.event.circle';
import { EndEventCircle } from './shape/end.event.circle';
import { SubProcessRect } from './shape/sub.process.rect'
import { SequenceFlowPath } from './sequence/sequence.flow.path'
import { ExclusiveGatewayRhombus } from './shape/exclusive.gateway.rhombus';
import { ParallelGatewayRhombus } from './shape/parallel.gateway.rhombus';
import { ManualTaskRect } from './shape/manual.task.rect';
import { ScriptTaskRect } from './shape/script.task.rect';
import { LaneRect } from './shape/lane.rect';
import { ParticipantRect } from './shape/participant.rect';
import { BusinessRuleTaskRect } from './shape/business.rule.task.rect';
import { IntermediateCatchEventCircle } from './shape/intermediate-catch.event.circle';
import { IntermediateThrowEventCircle } from './shape/intermediate-throw.event.circle';
import { ServiceTaskRect } from './shape/service.task.rect';
import { PrimitiveRect } from './shape/primitive.rect';
import { CallActivityTaskRect } from './shape/call.activity.task.rect';
import { InclusiveGatewayRhombus } from './shape/inclusive.gateway.rhombus';
import { EventBasedGatewayRhombus } from './shape/event.based.gateway.rhombus';
import { ComplexGatewayRhombus } from './shape/complex.gateway.rhombus';
import { ReceiveTaskRect } from './shape/receive.task.rect';
import { SendTaskRect } from './shape/sent.task.rect';
import { BoundaryEventCircle } from './shape/boundary.event.circle';
import { TransactionSubProccessRect } from './shape/transaction.subproccess.rect';

export const BpmnTypes = {
    'userTask': UserTaskRect,
    'scriptTask': ScriptTaskRect,
    'manualTask': ManualTaskRect,
    'startEvent': StartEventCircle,
    'endEvent': EndEventCircle,
    'subProcess': SubProcessRect,
    'adHocSubProcess': SubProcessRect,
    'sequenceFlow': SequenceFlowPath,
    'exclusiveGateway': ExclusiveGatewayRhombus,
    'parallelGateway': ParallelGatewayRhombus,
    'lane': LaneRect,
    'participant': ParticipantRect,
    'businessRuleTask': BusinessRuleTaskRect,
    'intermediateThrowEvent': IntermediateThrowEventCircle,
    'intermediateCatchEvent': IntermediateThrowEventCircle,
    'serviceTask': ServiceTaskRect,
    'task': PrimitiveRect,
    'callActivity': CallActivityTaskRect,
    'inclusiveGateway': InclusiveGatewayRhombus,
    'eventBasedGateway': EventBasedGatewayRhombus,
    'complexGateway': ComplexGatewayRhombus,
    'receiveTask': ReceiveTaskRect,
    'sendTask': SendTaskRect,
    'boundaryEvent': BoundaryEventCircle,
    'transaction': TransactionSubProccessRect
}
